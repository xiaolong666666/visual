<template>
  <div class="flex justify-start items-center w-full m-4 text-sm font-medium">
    <div class="flex items-end gap-2">
      <h3>设置项目地址</h3>
      <span class="text-blue-400 text-xs">鼠标右击，设置项目地址</span>
    </div>
  </div>
  <hr />
  <div class="main">
    <div class="absolute top-0 w-full flex justify-between p-2 z-50">
      <div class="flex relative">
        <div class="flex justify-center items-center relative bg-white">
          <input
            type="text"
            placeholder="搜索地点"
            v-model="searchValue"
            @input="onInput"
            @keyup.enter="onSearch"
            @keyup.escape.stop="onClearSearch"
            class="w-72 h-full indent-1 mr-6 focus:outline-0"
          />
          <img
            src="/assets/amap_search_clear.svg"
            width="16"
            height="16"
            v-show="searchValue"
            @click="onClearSearch"
            class="absolute right-1 cursor-pointer"
          />
        </div>
        <div
          class="flex justify-center items-center w-14 h-9 bg-blue-400 rounded-e-sm cursor-pointer"
        >
          <img src="/assets/amap_search.svg" @click="onSearch" />
        </div>
        <div
          v-show="searchResult.length"
          class="absolute top-10 w-full z-10 bg-white"
        >
          <div v-for="record in searchResult">
            <div
              :key="record.id"
              @click="onPointerSearch(record)"
              class="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-slate-200"
            >
              <img src="/assets/amap_search_locate.svg" />
              <span class="w-max ellipsis"
                ><strong>{{ searchValue }}</strong
                >{{ record.name.replace(searchValue, "") }}</span
              >
              <span class="w-max ellipsis">{{ record.pname }}</span>
              <span class="w-max ellipsis text-xs text-slate-400"
                >{{ record.cityname }}{{ record.adname }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div
          v-show="state.currentLayer === LAYER_MAP['SATELLITE']"
          class="flex gap-2"
        >
          <div class="relative">
            <el-button @click="onBeforeScreenshot">
              <img src="/assets/amap_action_screenshot.svg" />
              <span>截图</span>
            </el-button>
            <div v-show="state.isScreenshotVisible" class="tooltip">
              <span>点击截图航拍图</span>
              <span class="know" @click="onCloseTip('isScreenshotVisible')"
                >知道了</span
              >
            </div>
          </div>
          <el-button
            ><el-checkbox v-model="state.isRoadNet" @change="onSwitchRoadNet"
              >路网</el-checkbox
            ></el-button
          >
        </div>
        <div class="relative">
          <el-button-group>
            <el-button
              :key="LAYER_MAP['SATELLITE']"
              :type="
                state.currentLayer === LAYER_MAP['SATELLITE']
                  ? 'primary'
                  : 'default'
              "
              @click="onSwitchLayer(LAYER_MAP['SATELLITE'])"
            >
              <div class="flex gap-1">
                <img
                  src="/assets/amap_layer_satellite.svg"
                  v-show="state.currentLayer === LAYER_MAP['2D']"
                />
                <img
                  src="/assets/amap_layer_satellite_active.svg"
                  v-show="state.currentLayer === LAYER_MAP['SATELLITE']"
                />
                <span>卫星地图</span>
              </div>
            </el-button>
            <el-button
              :key="LAYER_MAP['2D']"
              :type="
                state.currentLayer === LAYER_MAP['2D'] ? 'primary' : 'default'
              "
              @click="onSwitchLayer(LAYER_MAP['2D'])"
            >
              <div class="flex gap-1">
                <img
                  src="/assets/amap_layer_2d.svg"
                  v-show="state.currentLayer === LAYER_MAP['SATELLITE']"
                />
                <img
                  src="/assets/amap_layer_2d_active.svg"
                  v-show="state.currentLayer === LAYER_MAP['2D']"
                />
                <span>2D地图</span>
              </div>
            </el-button>
          </el-button-group>
          <div
            v-show="
              state.currentLayer === LAYER_MAP['2D'] && state.isSatelliteVisible
            "
            class="tooltip"
          >
            <span>点击卫星地图截图航拍图</span>
            <span class="know" @click="onCloseTip('isSatelliteVisible')"
              >知道了</span
            >
          </div>
        </div>
      </div>
    </div>
    <div id="mapContainer" class="mapContainer"></div>
    <div id="mapScreenshotOverlay" class="hidden absolute top-0 left-0 z-50">
      <img id="mapToImage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  ElMessageBox,
  ElButtonGroup,
  ElButton,
  ElCheckbox,
} from "element-plus";
import { debounce } from "lodash";
import CropperScreenshot from "@/components/cropper-screenshot";

const _NOTICE_CONTEXT_MENU_ = "_notice_context_menu_";
const _SATELLITE_TIP_CLOSED_ = "_satellite_tip_closed_";
const _SCREENSHOT_TIP_CLOSED_ = "_screenshot_tip_closed_";
const VISIBLE_MAP = {
  isSatelliteVisible: _SATELLITE_TIP_CLOSED_,
  isScreenshotVisible: _SCREENSHOT_TIP_CLOSED_,
};
const LAYER_MAP = {
  SATELLITE: "satellite",
  "2D": "2D",
};

// 搜索值
const searchValue = ref("");
// 搜索结果
const searchResult = ref([]);
const state = reactive({
  // 当前图层
  currentLayer: LAYER_MAP["SATELLITE"],
  // 路网
  isRoadNet: false,
  // 提示
  isSatelliteVisible: !localStorage.getItem(_SATELLITE_TIP_CLOSED_),
  isScreenshotVisible: !localStorage.getItem(_SCREENSHOT_TIP_CLOSED_),
});

// 地图
let map;
// 2D 图层
let normalLayer;
// 卫星图层
let satelliteLayer;
// 路网图层
let roadNetLayer;

let placeSearch;
let scalePlugin;
let controlBarPlugin;
let toolBarPlugin;

let selectedMarker;
let searchMarker;
let marker;

// 获取到的截图信息
let croppedImageInfo;

// 搜索地点
function onSearch() {
  if (!searchValue.value) return;
  placeSearch.search(searchValue.value, (status, result) => {
    if (status === "complete" && result.info === "OK") {
      searchResult.value = result.poiList.pois;
    }
  });
}

const onInput = debounce(onSearch, 300);

// 清除搜索地点
function onClearSearch() {
  searchValue.value = "";
  searchResult.value = [];
}

// 搜索具体地点
function onPointerSearch(pointer) {
  if (!pointer) return;
  if (pointer && pointer.location) {
    map.setCenter(pointer.location);
    map.setZoom(16);
    addSearchMarker(pointer.location);
  }
  searchValue.value = pointer.name;
  searchResult.value = [];
}

// 初始化地图
function initMap() {
  AMapLoader.load({
    key: "d2ca54b8dc8c9bccaa218b9249474467",
    version: "2.0",
    // 插件列表
    plugins: [
      "AMap.Autocomplete",
      "AMap.PlaceSearch",
      "AMap.Geocoder",
      "AMap.Geolocation",
      "AMap.ContextMenu",
      "AMap.Scale",
      "AMap.ToolBar",
      "AMap.ControlBar",
      "AMap.MapType",
      "AMap.MapsEvent",
    ],
  })
    .then((AMap) => {
      satelliteLayer = new AMap.TileLayer.Satellite();
      roadNetLayer = new AMap.TileLayer.RoadNet();
      normalLayer = new AMap.TileLayer();

      // 创建地图
      map = new AMap.Map("mapContainer", {
        viewMode: "2D",
        zoom: 16,
        layers: [normalLayer],
        //!!! 不缓存
        WebGLParams: {
          preserveDrawingBuffer: true,
        },
      });

      placeSearch = new AMap.PlaceSearch({
        city: "全国",
        extensions: "complete",
      });

      scalePlugin = new AMap.Scale({
        position: {
          bottom: "18px",
          right: "100px",
        },
      });

      controlBarPlugin = new AMap.ControlBar({
        position: {
          bottom: "90px",
          right: "10px",
        },
      });

      toolBarPlugin = new AMap.ToolBar({
        position: {
          bottom: "10px",
          right: "40px",
        },
      });

      map.addControl(scalePlugin);
      map.addControl(controlBarPlugin);
      map.addControl(toolBarPlugin);
      map.on("rightclick", function (e) {
        addContextMenu(e);
      });

      initialLocation();
    })
    .catch(console.error);
}

// 初始化位置
function initialLocation() {
  if (
    map &&
    selectedMarker &&
    selectedMarker.longitude &&
    selectedMarker.latitude
  ) {
    map.setZoomAndCenter(16, [
      selectedMarker.longitude,
      selectedMarker.latitude,
    ]);
    addMarker(selectedMarker);
  }
}

function onKeyDown(e) {
  if (e.key === "Escape") removeContextMenu();
}

// 移除右键菜单
function removeContextMenu() {
  const menu = document.getElementById("map-context-menu");
  menu?.remove();
  document.removeEventListener("click", removeContextMenu);
  document.removeEventListener("click", onKeyDown);
}

// 切换图层
function onSwitchLayer(layer) {
  state.currentLayer = layer;

  if (map) {
    map.remove([normalLayer, satelliteLayer, roadNetLayer]);
    if (layer === LAYER_MAP["SATELLITE"]) {
      map.setLayers([satelliteLayer]);
    }
    if (layer === LAYER_MAP["2D"]) {
      map.setLayers([normalLayer]);
    }
  }
}

// 切换路网
function onSwitchRoadNet() {
  if (map && state.currentLayer === LAYER_MAP["SATELLITE"]) {
    map.remove([normalLayer, satelliteLayer, roadNetLayer]);

    const layers = [satelliteLayer];
    if (state.isRoadNet) layers.push(roadNetLayer);
    map.setLayers(layers);
  }
}

// 关闭提示
function onCloseTip(key) {
  state[key] = false;
  localStorage.setItem(VISIBLE_MAP[key], "true");
}

// 创建右键菜单
function addContextMenu(e) {
  const mapContainer = document.getElementById("mapContainer");
  const mapContainerBound = mapContainer.getBoundingClientRect();
  const contextMenu = `<div
    id="map-context-menu"
    class="absolute w-max p-1 bg-slate-50 shadow text-slate-600 text-sm rounded cursor-pointer"
  >
    <div id="map-context-menu-marker" class="flex items-center gap-1 w-32">
      <img src="/assets/amap_location.svg" />
      <span>设置为项目地址</span>
    </div>
    <div class="flex items-center gap-1 w-32">
      <img id="map-context-menu-snapshot" src="/assets/amap_action_screenshot.svg" width="20" height="20" />
      <span>截取航拍图</span>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", contextMenu);
  const menu = document.getElementById("map-context-menu");
  const menuMarker = document.getElementById("map-context-menu-marker");
  const menuSnapshot = document.getElementById("map-context-menu-snapshot");
  const {
    pixel: { x, y },
    lnglat,
  } = e;
  menu.style.display = "block";
  menu.style.left = mapContainerBound.x + x + "px";
  menu.style.top = mapContainerBound.y + y + "px";

  menuMarker?.addEventListener("click", function (e) {
    e.preventDefault();
    removeContextMenu();
    selectedMarker = { longitude: lnglat.lng, latitude: lnglat.lat };
    setProjectAddress(lnglat);
  });

  menuSnapshot?.addEventListener("click", function (e) {
    e.preventDefault();
    if (state.currentLayer === LAYER_MAP["2D"]) {
      onSwitchLayer(LAYER_MAP["SATELLITE"]);
    } else if (state.currentLayer === LAYER_MAP["SATELLITE"]) {
      if (state.roadNet) {
        state.roadNet = false;
        onShowRoadNetLayer();
      }
      setTimeout(startScreenshot, 100);
    }
  });

  document.addEventListener("click", removeContextMenu);
  document.addEventListener("keydown", onKeyDown);
}

// 提示信息
function onBeforeScreenshot() {
  if (state.currentLayer === LAYER_MAP["SATELLITE"] && state.isRoadNet) {
    console.info("提示用户取消路网截图更方便");
  } else {
    startScreenshot();
  }
}

// 开始截图
function startScreenshot() {
  const mapContainer = document.querySelector("#mapContainer");
  const mapScreenshotOverlay = document.querySelector("#mapScreenshotOverlay");
  const mapCanvas = document.querySelector("#mapContainer .amap-layer");

  if (map) {
    const cropperImage = document.querySelector("#mapToImage");
    let imgData = mapCanvas.toDataURL("jpg");
    const rect = mapContainer.getBoundingClientRect();
    cropperImage.src = imgData;
    cropperImage.width = rect.width;
    cropperImage.height = rect.height;
    mapScreenshotOverlay.style.display = "block";
    let cropper;

    cropperImage.onload = function () {
      mapContainer.style.display = "none";
      cropper = new CropperScreenshot(cropperImage, {
        onCropperEnd: (croppedImageInfo) => {
          croppedImageInfo = croppedImageInfo;
          mapScreenshotOverlay.style.display = "none";
          mapContainer.style.display = "block";
        },
        onCropperCancel: () => {
          mapScreenshotOverlay.style.display = "none";
          mapContainer.style.display = "block";
        },
      });
    };

    function onKeyDownWithScreenshot() {
      if (cropper) {
        cropper.cancelCrop();
      }
      document.removeEventListener("keydown", onKeyDownWithScreenshot);
    }
    document.addEventListener("keydown", onKeyDownWithScreenshot);
  }
}

// 添加坐标点
function addMarker(point) {
  if (searchMarker) {
    map.remove(searchMarker);
    searchMarker = null;
  }
  if (marker) {
    map.remove(marker);
    marker = null;
  }

  const position = new AMap.LngLat(point.longitude, point.latitude);
  const content = `<img src="/assets/amap_location.svg" />`;

  marker = new AMap.Marker({
    position,
    content,
    offset: new AMap.Pixel(-10, -10),
  });

  map.add(marker);

  marker.on("rightclick", function (e) {
    map.emit("rightclick", {
      lnglat: e.lnglat,
      pixel: e.pixel,
      target: map,
    });
  });
}

// 查询坐标点
async function setProjectAddress(pointer) {
  const geocoder = new AMap.Geocoder({ city: "全国" });
  await geocoder.getAddress([pointer.lng, pointer.lat], (status, result) => {
    if (status === "complete" && result.info === "OK") {
      selectedMarker.address = result?.regeocode?.formattedAddress;
      addMarker(selectedMarker);
    } else {
      console.error(`获取位置信息失败：${status}`);
    }
  });
}

// 温馨提示
function showNotice() {
  if (!localStorage.getItem(_NOTICE_CONTEXT_MENU_)) {
    ElMessageBox.confirm("鼠标右击地图，设置项目地址 或 卫星截图", "温馨提示", {
      confirmButtonText: "我已知晓",
      cancelButtonText: "不再提示",
      type: "info",
      "append-to": "map-dialog",
    }).catch(() => {
      localStorage.setItem(_NOTICE_CONTEXT_MENU_, "true");
    });
  }
}

onMounted(() => {
  showNotice();
  nextTick(() => {
    initMap();
  });
});
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: calc(100vh - 52px);
}

.mapContainer {
  width: 100%;
  height: 100%;
}

.tooltip {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: calc(100% + 8px);
  width: max-content;
  background-color: #efefef;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.tooltip::before {
  content: "";
  position: absolute;
  left: 25%;
  top: -6px;
  transform: rotate(45deg);
  background-color: #efefef;
  width: 12px;
  height: 12px;
  z-index: 10;
}

.tooltip > .know {
  color: #f80;
  opacity: 0.8;
  cursor: pointer;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
