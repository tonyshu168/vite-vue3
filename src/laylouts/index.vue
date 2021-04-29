<script setup lang="jsx">
import { defineProps, reactive, defineEmit, useContext } from 'vue';

export default {
  setup() {

    return() => {
      return (
      <div>
        <nav></nav>
        <main>
          <Navbar></Navbar>
          <AppMain></AppMain>
        </main>
      </div>
      )
    }
  }
}
</script>