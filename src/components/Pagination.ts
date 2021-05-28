const props = {
  total: {
    required: true,
    title: '总数',
    description: '总数',
    type: Number,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
}

export default props;

