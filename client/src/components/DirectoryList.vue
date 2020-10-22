<template>
  <section class="directory-list">
    <div
      class="directory-list__item"
      v-for="(dir, index) of childs"
      :key="index"
      @dblclick="open(dir)"
    >
      <div class="ico">
        <svg
          v-if="dir.isDirectory"
          style="enable-background:new 0 0 50 50;"
          version="1.1"
          viewBox="0 0 50 50"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_1_1_">
            <path
              d="M41.841,10H19.255l-4-4H0.841v36h0.033l-0.033,2h41v-1.863L49.159,16h-7.318V10z M14.427,8l4,4h21.414v4H8.083L2.841,34.72   V8H14.427z M39.878,41.73L39.841,42H2.88L9.6,18h36.923L39.878,41.73z"
            />
          </g>
        </svg>
      </div>
      <div class="name">{{ dir.name }}</div>
      <!-- <div class="type">{{ dir.isDirectory ? "folder" : "file" }}</div> -->
      <div class="moddate">{{ formatDate(dir.modificationDate) }}</div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import moment from 'moment';

export default {
  name: "DirectoryList",
  props: {
    childs: Array,
  },
  setup(props, context) {
    const childs = ref([]);

    function formatDate(date) {
      return moment(date).format('DD.MM.YYYY hh:mm:ss');
    }

    function open(dir) {
      if (dir.isDirectory) {
        openFolder(dir.path);
      } else {
        downloadFile(dir.path);
      }
    }

    function openFolder(path) {
      context.emit("openFolder", path);
    }

    function downloadFile(path) {
      context.emit("downloadFile", path);
    }

    watch(
      () => props.childs,
      (first, second) => childs.value = first.sort((a, b) => {
        if (a.isDirectory && b.isDirectory) {
          return 0;
        } else if (b.isDirectory) {
          return 1;
        } else {
          return -1;
        }
      })
    );

    return {
      childs,
      formatDate,
      open,
    };
  },
};
</script>

<style scoped lang="scss">
.directory-list {
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 400px;
  max-height: 400px;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid #e4e4e4;
  // padding: 0.5rem;

  &__item {
    display: flex;
    padding: 0.2rem 0.5rem;

    .ico {
      width: 1rem;
      margin-right: 0.25rem;
    }

    .name {
      margin-right: 1rem;
    }

    .type {
      margin-left: auto;
      margin-right: 1rem;
    }

    .moddate {
      margin-left: auto;
    }

    &:hover {
      cursor: pointer;
      background-color: #e4e4e4;
    }
  }
}
</style>
