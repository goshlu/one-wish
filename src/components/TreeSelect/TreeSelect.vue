<template>
  <div :class="wrapperClass" ref="wrapperRef">
    <div
      class="my-tree-select__control"
      :tabindex="finalDisabled ? -1 : 0"
      @click="toggleDropdown"
      @mousedown.prevent
      @keydown="handleKeydown"
    >
      <div class="my-tree-select__value">
        <template v-if="displayLabels.length">
          <template v-if="multiple">
            <span
              v-for="(label, index) in displayLabels"
              :key="index"
              class="my-tree-select__tag"
            >
              {{ label }}
            </span>
          </template>
          <template v-else>{{ displayLabels[0] }}</template>
        </template>
        <span v-else class="my-tree-select__placeholder">{{ placeholder }}</span>
      </div>
      <div class="my-tree-select__icons">
        <span
          v-if="clearable && isFilled && !finalDisabled"
          class="my-tree-select__clear"
          @click.stop="handleClear"
        >
          &times;
        </span>
        <span class="my-tree-select__arrow" :class="{ 'is-open': dropdownVisible }"
          >?</span
        >
      </div>
    </div>
    <teleport to="body">
      <transition name="tree-select-fade">
        <div
          v-if="dropdownVisible"
          ref="dropdownRef"
          class="my-tree-select__dropdown"
          :style="dropdownStyle"
        >
          <div v-if="filterable" class="my-tree-select__search">
            <input
              ref="searchRef"
              v-model="searchValue"
              class="my-tree-select__search-input"
              placeholder="搜索"
              @keydown.stop
              @input="handleSearch"
            />
          </div>
          <div class="my-tree-select__tree" :style="{ height: `${listHeight}px` }">
            <TreeNode
              v-for="node in filteredOptions"
              :key="node.value"
              :node="node"
              :checkable="checkable"
              :multiple="multiple"
              :selected-keys="selectedKeys"
              :checked-keys="checkedKeys"
              :expanded-keys="expandedKeys"
              :tree-line="treeLine"
              :search-value="searchValue"
              @select="handleNodeSelect"
              @check="handleNodeCheck"
              @expand="handleNodeExpand"
            />
            <div v-if="!filteredOptions.length" class="my-tree-select__empty">
              暂无数据
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import type { TreeSelectProps, TreeSelectEmits, TreeSelectOption } from "./types";
import type { FormItemContext } from "../Form/types";
import { formItemContextKey } from "../Form/types";
import TreeNode from "./TreeNode.vue";

defineOptions({
  name: "MyTreeSelect",
});

const props = withDefaults(defineProps<TreeSelectProps>(), {
  modelValue: null,
  options: () => [],
  placeholder: "请选择",
  disabled: false,
  clearable: false,
  filterable: false,
  multiple: false,
  showCheckedStrategy: "SHOW_CHILD",
  checkable: false,
  size: "default",
  treeDefaultExpandAll: false,
  treeDefaultExpandedKeys: () => [],
  treeLine: false,
  virtual: false,
  listHeight: 256,
});

const emit = defineEmits<TreeSelectEmits>();
const formItem = inject<FormItemContext | null>(formItemContextKey, null);

const wrapperRef = ref<HTMLElement>();
const dropdownVisible = ref(false);
const searchValue = ref("");
const selectedValue = ref<TreeSelectProps["modelValue"]>(
  props.modelValue ?? (props.multiple ? [] : null)
);
const dropdownStyle = ref<Record<string, string>>({});
const dropdownRef = ref<HTMLElement>();
const searchRef = ref<HTMLInputElement>();
const expandedKeys = ref<Array<string | number>>([...props.treeDefaultExpandedKeys]);

const finalSize = computed(
  () => props.size ?? formItem?.size.value ?? "default"
);
const finalDisabled = computed(
  () => props.disabled || formItem?.disabled.value || false
);
const multiple = computed(() => props.multiple);
const checkable = computed(() => props.checkable);

watch(
  () => props.modelValue,
  (value) => {
    selectedValue.value = value ?? (multiple.value ? [] : null);
  }
);

watch(
  () => props.treeDefaultExpandedKeys,
  (keys) => {
    expandedKeys.value = [...keys];
  }
);

const selectedKeys = computed(() => {
  if (multiple.value) {
    // 确保只返回一维数组
    if (Array.isArray(selectedValue.value)) {
      return selectedValue.value.filter(item => 
        item !== null && item !== undefined && !Array.isArray(item)
      ) as Array<string | number>;
    }
    return [];
  }
  return selectedValue.value !== null && selectedValue.value !== undefined && !Array.isArray(selectedValue.value) ? [selectedValue.value] : [];
});

const checkedKeys = computed(() => {
  if (checkable.value && multiple.value) {
    return Array.isArray(selectedValue.value) ? selectedValue.value : [];
  }
  return [];
});

const displayLabels = computed(() => {
  const getSelectedLabels = (options: TreeSelectOption[], keys: Array<string | number>): string[] => {
    const labels: string[] = [];
    
    const findNode = (nodes: TreeSelectOption[], targetKey: string | number): TreeSelectOption | null => {
      for (const node of nodes) {
        if (node.value === targetKey) return node;
        if (node.children) {
          const found = findNode(node.children, targetKey);
          if (found) return found;
        }
      }
      return null;
    };

    for (const key of keys) {
      const node = findNode(options, key);
      if (node) {
        labels.push(node.label);
      }
    }
    
    return labels;
  };

  if (multiple.value) {
    return getSelectedLabels(props.options, selectedKeys.value);
  } else {
    // In non-multiple mode, selectedValue should be a single value, not an array
    const singleValue = selectedValue.value;
    if (singleValue !== null && singleValue !== undefined && !Array.isArray(singleValue)) {
      return getSelectedLabels(props.options, [singleValue]);
    }
    return [];
  }
});

const isFilled = computed(() => {
  if (multiple.value) {
    return Array.isArray(selectedValue.value) && selectedValue.value.length > 0;
  }
  return (
    selectedValue.value !== null &&
    selectedValue.value !== undefined &&
    selectedValue.value !== ""
  );
});

const wrapperClass = computed(() => [
  "my-tree-select",
  `my-tree-select--${finalSize.value}`,
  {
    "is-open": dropdownVisible.value,
    "is-disabled": finalDisabled.value,
    "is-multiple": multiple.value,
  },
]);

const filteredOptions = computed(() => {
  if (!props.filterable || !searchValue.value.trim()) {
    return props.options;
  }
  
  const filterNodes = (nodes: TreeSelectOption[]): TreeSelectOption[] => {
    return nodes.reduce((acc: TreeSelectOption[], node) => {
      const matchesSearch = node.label.toLowerCase().includes(searchValue.value.toLowerCase());
      const filteredChildren = node.children ? filterNodes(node.children) : [];
      
      if (matchesSearch || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        });
      }
      
      return acc;
    }, []);
  };
  
  return filterNodes(props.options);
});

const openDropdown = () => {
  if (finalDisabled.value) return;
  dropdownVisible.value = true;
  emit("visibleChange", true);
  updateDropdownPosition();
  bindGlobalListeners();
  
  if (props.treeDefaultExpandAll) {
    expandedKeys.value = getAllNodeKeys(props.options);
  }
  
  if (props.filterable) {
    requestAnimationFrame(() => searchRef.value?.focus());
  }
};

const closeDropdown = () => {
  dropdownVisible.value = false;
  emit("visibleChange", false);
  searchValue.value = "";
  unbindGlobalListeners();
};

const toggleDropdown = () => {
  dropdownVisible.value ? closeDropdown() : openDropdown();
};

const handleNodeSelect = (value: string | number, selected: boolean, node: TreeSelectOption) => {
  if (node.disabled || (node.selectable === false)) return;
  
  emit("select", value, selected, node);
  
  if (checkable.value) {
    // 在checkable模式下，选择不改变值
    return;
  }
  
  if (multiple.value) {
    const values = Array.isArray(selectedValue.value) ? [...selectedValue.value] : [];
    const index = values.indexOf(value);
    if (selected && index === -1) {
      values.push(value);
    } else if (!selected && index > -1) {
      values.splice(index, 1);
    }
    selectedValue.value = values;
    emit("update:modelValue", values);
    emit("change", values, displayLabels.value);
  } else {
    selectedValue.value = selected ? value : null;
    emit("update:modelValue", selected ? value : null);
    emit("change", selected ? value : null, selected ? [node.label] : []);
    if (selected) {
      closeDropdown();
    }
  }
  
  formItem?.onFieldChange();
};

const handleNodeCheck = (value: string | number, checked: boolean, node: TreeSelectOption) => {
  if (node.disabled || node.disableCheckbox) return;
  
  emit("check", value, checked, node);
  
  if (multiple.value) {
    const values = Array.isArray(selectedValue.value) ? [...selectedValue.value] : [];
    const index = values.indexOf(value);
    if (checked && index === -1) {
      values.push(value);
    } else if (!checked && index > -1) {
      values.splice(index, 1);
    }
    selectedValue.value = values;
    emit("update:modelValue", values);
    emit("change", values, displayLabels.value);
  }
  
  formItem?.onFieldChange();
};

const handleNodeExpand = (value: string | number, expanded: boolean) => {
  const index = expandedKeys.value.indexOf(value);
  if (expanded && index === -1) {
    expandedKeys.value.push(value);
  } else if (!expanded && index > -1) {
    expandedKeys.value.splice(index, 1);
  }
};

const handleClear = () => {
  if (!isInteractive()) return;
  const emptyValue = multiple.value ? [] : null;
  selectedValue.value = emptyValue;
  emit("update:modelValue", emptyValue);
  emit("change", emptyValue, multiple.value ? [] : "");
  emit("clear");
  formItem?.onFieldChange();
};

const handleSearch = () => {
  emit("search", searchValue.value);
};

const isInteractive = () => !finalDisabled.value;

const getAllNodeKeys = (nodes: TreeSelectOption[]): Array<string | number> => {
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

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    !wrapperRef.value?.contains(target) &&
    !dropdownRef.value?.contains(target)
  ) {
    closeDropdown();
  }
};

const updateDropdownPosition = () => {
  const wrapper = wrapperRef.value;
  if (!wrapper) return;
  const rect = wrapper.getBoundingClientRect();
  dropdownStyle.value = {
    position: "absolute",
    minWidth: `${rect.width}px`,
    top: `${rect.bottom + window.scrollY + 4}px`,
    left: `${rect.left + window.scrollX}px`,
  };
};

const handleWindowResize = () => {
  if (!dropdownVisible.value) return;
  updateDropdownPosition();
};

const handleWindowScroll = () => {
  if (!dropdownVisible.value) return;
  closeDropdown();
};

const bindGlobalListeners = () => {
  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("scroll", handleWindowScroll, true);
};

const unbindGlobalListeners = () => {
  window.removeEventListener("resize", handleWindowResize);
  window.removeEventListener("scroll", handleWindowScroll, true);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (finalDisabled.value) return;
  if (
    !dropdownVisible.value &&
    ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)
  ) {
    event.preventDefault();
    openDropdown();
    return;
  }
  switch (event.key) {
    case "Escape":
      event.preventDefault();
      closeDropdown();
      break;
    default:
      break;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  unbindGlobalListeners();
});
</script>

<style scoped>
.my-tree-select {
  position: relative;
  width: 100%;
}

.my-tree-select__control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  background: var(--form-control-bg, var(--bg-color));
  cursor: pointer;
  transition: border-color 0.2s;
}

.my-tree-select__control:hover {
  border-color: var(--form-control-hover-border, var(--border-color-light));
}

.my-tree-select.is-open .my-tree-select__control {
  border-color: var(--form-control-focus-border, var(--primary-color));
  box-shadow: var(--form-control-focus-shadow, none);
}

.my-tree-select.is-disabled .my-tree-select__control {
  cursor: not-allowed;
  background-color: var(--bg-color-light);
  color: var(--text-placeholder);
}

.my-tree-select__value {
  flex: 1;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  color: var(--text-regular);
}

.my-tree-select__placeholder {
  color: var(--text-placeholder);
}

.my-tree-select__icons {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-placeholder);
}

.my-tree-select__arrow {
  transition: transform 0.2s;
}

.my-tree-select__arrow.is-open {
  transform: rotate(180deg);
}

.my-tree-select__clear {
  cursor: pointer;
}

.my-tree-select__dropdown {
  position: absolute;
  z-index: 1000;
  background: var(--bg-color);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-base);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.my-tree-select__search {
  padding: 8px;
  border-bottom: 1px solid var(--border-color-light);
}

.my-tree-select__search-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--border-color-base);
  border-radius: 4px;
  outline: none;
}

.my-tree-select__tree {
  overflow-y: auto;
  padding: 4px 0;
}

.my-tree-select__empty {
  text-align: center;
  padding: 12px;
  color: var(--text-placeholder);
}

.my-tree-select__tag {
  background-color: var(--primary-color-light, rgba(64, 158, 255, 0.15));
  color: var(--primary-color);
  border-radius: 4px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 1.6;
}

.my-tree-select--large .my-tree-select__control {
  padding: 10px 14px;
}

.my-tree-select--small .my-tree-select__control {
  padding: 6px 10px;
}

.tree-select-fade-enter-active,
.tree-select-fade-leave-active {
  transition: opacity 0.15s ease;
}

.tree-select-fade-enter-from,
.tree-select-fade-leave-to {
  opacity: 0;
}
</style>
