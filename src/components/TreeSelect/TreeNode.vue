<template>
  <div class="my-tree-node">
    <div
      :class="nodeClass"
      @click="handleClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <span
        v-if="hasChildren"
        :class="expandIconClass"
        @click.stop="handleExpand"
      >
        <svg viewBox="0 0 24 24" width="8" height="8">
          <path
            d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span v-else class="my-tree-node__indent"></span>
      
      <span
        v-if="checkable && multiple"
        class="my-tree-node__checkbox"
        :class="checkboxClass"
        @click.stop="handleCheck"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            v-if="isChecked"
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            fill="currentColor"
          />
          <rect
            v-else-if="isIndeterminate"
            x="6" y="11" width="12" height="2" fill="currentColor"
          />
        </svg>
      </span>
      
      <span class="my-tree-node__label" :class="{ 'is-highlighted': isHighlighted }">
        {{ node.label }}
      </span>
    </div>
    
    <transition name="tree-node-expand">
      <div v-if="expanded && hasChildren" class="my-tree-node__children">
        <TreeNode
          v-for="child in node.children"
          :key="child.value"
          :node="child"
          :checkable="checkable"
          :multiple="multiple"
          :selected-keys="selectedKeys"
          :checked-keys="checkedKeys"
          :expanded-keys="expandedKeys"
          :tree-line="treeLine"
          :search-value="searchValue"
          :level="level + 1"
          @select="handleChildSelect"
          @check="handleChildCheck"
          @expand="handleChildExpand"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { TreeSelectOption } from "./types";

interface Props {
  node: TreeSelectOption;
  checkable?: boolean;
  multiple?: boolean;
  selectedKeys?: Array<string | number>;
  checkedKeys?: Array<string | number>;
  expandedKeys?: Array<string | number>;
  treeLine?: boolean;
  searchValue?: string;
  level?: number;
}

const props = withDefaults(defineProps<Props>(), {
  checkable: false,
  multiple: false,
  selectedKeys: () => [],
  checkedKeys: () => [],
  expandedKeys: () => [],
  treeLine: false,
  searchValue: "",
  level: 0,
});

const emit = defineEmits<{
  (e: 'select', value: string | number, selected: boolean, node: TreeSelectOption): void;
  (e: 'check', value: string | number, checked: boolean, node: TreeSelectOption): void;
  (e: 'expand', value: string | number, expanded: boolean): void;
}>();

const hovered = ref(false);

const hasChildren = computed(() => props.node.children && props.node.children.length > 0);
const expanded = computed(() => props.expandedKeys.includes(props.node.value));
const isSelected = computed(() => props.selectedKeys.includes(props.node.value));
const isChecked = computed(() => props.checkedKeys.includes(props.node.value));
const isIndeterminate = computed(() => {
  if (!hasChildren.value || !props.checkable) return false;
  const childKeys = getAllChildKeys(props.node.children || []);
  const checkedChildKeys = childKeys.filter(key => props.checkedKeys.includes(key));
  return checkedChildKeys.length > 0 && checkedChildKeys.length < childKeys.length;
});

const isHighlighted = computed(() => {
  if (!props.searchValue.trim()) return false;
  return props.node.label.toLowerCase().includes(props.searchValue.toLowerCase());
});

const nodeClass = computed(() => [
  "my-tree-node__content",
  {
    "is-selected": isSelected.value,
    "is-disabled": props.node.disabled,
    "is-hovered": hovered.value,
    "is-checkable": props.checkable,
  },
]);

const expandIconClass = computed(() => [
  "my-tree-node__expand-icon",
  {
    "is-expanded": expanded.value,
  },
]);

const checkboxClass = computed(() => [
  "my-tree-node__checkbox-icon",
  {
    "is-checked": isChecked.value,
    "is-indeterminate": isIndeterminate.value,
    "is-disabled": props.node.disableCheckbox || props.node.disabled,
  },
]);

const getAllChildKeys = (nodes: TreeSelectOption[]): Array<string | number> => {
  const keys: Array<string | number> = [];
  const traverse = (nodeList: TreeSelectOption[]) => {
    nodeList.forEach(node => {
      keys.push(node.value);
      if (node.children) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return keys;
};

const handleClick = () => {
  if (props.node.disabled) return;
  emit("select", props.node.value, !isSelected.value, props.node);
};

const handleExpand = () => {
  emit("expand", props.node.value, !expanded.value);
};

const handleCheck = () => {
  if (props.node.disableCheckbox || props.node.disabled) return;
  emit("check", props.node.value, !isChecked.value, props.node);
};

const handleChildSelect = (value: string | number, selected: boolean, node: TreeSelectOption) => {
  emit("select", value, selected, node);
};

const handleChildCheck = (value: string | number, checked: boolean, node: TreeSelectOption) => {
  emit("check", value, checked, node);
};

const handleChildExpand = (value: string | number, expanded: boolean) => {
  emit("expand", value, expanded);
};
</script>

<style scoped>
.my-tree-node {
  user-select: none;
}

.my-tree-node__content {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  min-height: 32px;
}

.my-tree-node__content:hover,
.my-tree-node__content.is-hovered {
  background-color: var(--bg-color-light);
}

.my-tree-node__content.is-selected {
  background-color: var(--primary-color-light, rgba(64, 158, 255, 0.15));
  color: var(--primary-color);
}

.my-tree-node__content.is-disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: transparent;
}

.my-tree-node__expand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  cursor: pointer;
  color: var(--text-placeholder);
  transition: transform 0.2s;
}

.my-tree-node__expand-icon.is-expanded {
  transform: rotate(90deg);
}

.my-tree-node__indent {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.my-tree-node__checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid var(--border-color-base);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.my-tree-node__checkbox:hover {
  border-color: var(--primary-color);
}

.my-tree-node__checkbox-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid var(--border-color-base);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  background-color: white;
}

.my-tree-node__checkbox-icon:hover {
  border-color: var(--primary-color);
}

.my-tree-node__checkbox-icon.is-checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-tree-node__checkbox-icon.is-indeterminate {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-tree-node__checkbox-icon.is-disabled {
  cursor: not-allowed;
  background-color: var(--bg-color-light);
  border-color: var(--border-color-light);
  color: var(--text-placeholder);
}

.my-tree-node__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.my-tree-node__label.is-highlighted {
  color: var(--primary-color);
  font-weight: 500;
}

.my-tree-node__children {
  margin-left: 16px;
  border-left: 1px solid var(--border-color-light);
}

.tree-node-expand-enter-active,
.tree-node-expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.tree-node-expand-enter-from,
.tree-node-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.tree-node-expand-enter-to,
.tree-node-expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
