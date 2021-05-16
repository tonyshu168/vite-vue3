<script lang='tsx'>
// jsx原始写法
// export default {
//   data() {
//     return {
//       counter: 0,
//     }
//   },
//   methods: {
//     increment() {
//       this.counter++;
//     }
//   },
//   render() {
//     return (
//       <div>
//         <div>comp</div>
//         <div onClick={this.increment}>{this.counter}</div>
//       </div>
//     )
//   }
// }

// 别一种写法
import { ref } from 'vue';
export default {
  setup() {
    const counter = ref(0);
    const increment = () => {
      counter.value++;
    }

    return () => {
      return (
      <div>
        <p>comp</p>
        <p onClick={increment}>{counter.value}</p>
      </div>
      )
    }
  }
}
</script>