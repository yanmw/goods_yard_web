<template>
    <div>
      <template v-for="(child,index) in menuData">
        <el-submenu v-if="child.children && child.children.length >= 1" :index="child.url">
          <template slot="title">
            <!-- <i :class="child.iconCls?child.iconCls:[fa,fa-file]"></i> -->
            <span slot="title" style="font-size: 18px !important;color: #1E1F1F;">{{child.name}}</span>
          </template>
          <menu-tree :menuData="child.children"></menu-tree>
        </el-submenu>

        <el-menu-item v-else :index="child.url">
			<span class="menuDot"></span>
          <!-- <i :class="child.iconCls?child.iconCls:[fa,fa-file]"></i> -->
          <span slot="title" style="font-size: 16px!important;">{{child.name }}</span>
		  <span class="markList" v-if="child.mark">{{child.mark}}</span>
		  <span class="bergin"></span>
        </el-menu-item>
      </template>
    </div>
</template>

<script>
export default {
  name: 'menuTree',
  props: ['menuData'],
}
</script>

<style scoped>
.menuDot{
		display: inline-block;
		margin-left: 0;
		width: 8px;
		height: 8px;
		border-radius: 100%;
		border:1px solid #666;
		background-color: #fff;
		margin-right: 10px;
	}
	.el-menu-item{
		font-size: 14px!important;
	}
</style>
