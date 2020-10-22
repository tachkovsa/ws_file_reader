<template>
  <section class="reader-window">
    <div class="reader-window__header">
      <button class="reader-window__back" @click="openDir(state.parentPath)">
        <svg
          style="enable-background:new 0 0 512 512;"
          version="1.1"
          viewBox="0 0 512 512"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <polygon
            points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "
          />
        </svg>
      </button>
      <input
        type="text"
        class="reader-window__path"
        v-model="state.currentPath"
      />
    </div>
    <div class="reader-window__body">
      <DirectoryList
        :childs="state.currentDir?.directoryChild"
        @openFolder="openDir($event)"
        @downloadFile="downloadFile($event)"
      />
    </div>
  </section>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import axios from "axios";

import DirectoryList from "../components/DirectoryList";

export default {
  name: "Default",
  components: {
    DirectoryList,
  },
  setup(props, context) {
    const state = reactive({
      loading: false,
      currentPath: computed(() => state.currentDir?.directoryPath),
      parentPath: computed(() => state.currentDir?.parentDirectoryPath),
      currentDir: null,
    });

    onMounted(() => openDir());

    function fetchDirectory(path) {
      const requestParams =
        "?method=getDirectory" + (path ? `&path=${path}` : "");
      return axios.get(`/xlocal_reader/xlocal_api.html${requestParams}`);
    }

    function fetchFile(path) {
      const requestParams = `?method=getFileData&path=${path}`;
      return axios.get(`/xlocal_reader/xlocal_api.html${requestParams}`);
    }

    function openDir(path) {
      state.loading = true;
      fetchDirectory(path)
        .then((response) => {
          state.currentDir = response.data.data;
        })
        .finally(() => (state.loading = false));
    }

    function downloadFile(path) {
      state.loading = true;
      fetchFile(path)
        .then((response) => {
          console.log(response);
        })
        .finally(() => (state.loading = false));
    }

    return {
      state,
      openDir,
      downloadFile,
    };
  },
};
</script>

<style scoped lang="scss">
.reader-window {
  display: flex;
  flex-direction: column;
  width: 800px;
  box-sizing: border-box;
  margin: 0 auto;

  &__header {
    display: flex;
    flex-direction: row;
    background-color: #e4e4e4;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: center;
    box-sizing: border-box;
    padding-left: 0.25rem;
    padding-right: 0.5rem;
  }

  &__back {
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    outline: none;
    border: none;
    background: none;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
    }
  }

  &__path {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    background-color: #ffffff;
    width: 100%;
    border: none;
    outline: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }
}
</style>
