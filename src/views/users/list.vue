<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="账户名" prop="name"></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUpdate(scope)"
            >更新</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-remove"
            @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分布 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from 'element3';
import Pagination from 'comps/Pagination.vue';
import { useList } from './model/userModel';
export default {
  name: 'UserList',
  components: {
    Pagination
  },
  setup() {console.log('list.vue');
    // 用户数据列表
    const router = useRouter();
    const { state, getList, delItem } = useList();

    // 用户更新
    function handleUpdate({ row }) {
      router.push({
        name: 'userEdit',
        params: { id: row.id }
      })
    }

    // 删除用户
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo: 删除这一行或重新获取数据
        // 通知用户
        Message.success('删除成功!');
      })
    }

    return {
      ...toRefs(state),
      getList,
      handleUpdate,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scope>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>