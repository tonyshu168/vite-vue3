<script setup lang="jsx">
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return () => (
      <div>detail <span>{route.params.id}</span></div>
    )
  }
}
</script>