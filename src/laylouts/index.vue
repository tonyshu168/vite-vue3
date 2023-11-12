<script lang="jsx">
import { defineProps, reactive } from 'vue';
import NavBar from './components/Navbar.vue';
import AppMain from './components/AppMain.vue';
import Sidebar from "./components/Sidebar/index.vue";

export default {
  setup() {

    return() => {
      return (
      <div>
        <Sidebar class="sidebar-container"></Sidebar>
        <main class="main-container">
          <NavBar></NavBar>
          <AppMain></AppMain>
        </main>
      </div>
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>