<template>
  <div :class="wrapperClass" ref="wrapperRef">
    <div
      class="my-select__control"
      :tabindex="finalDisabled ? -1 : 0"
      @click="toggleDropdown"
      @mousedown.prevent
      @keydown="handleKeydown"
    >
      <div class="my-select__value">
        <template v-if="selectedLabels.length">
          <template v-if="multiple">
            <span
              v-for="(label, index) in selectedLabels"
              :key="index"
              class="my-select__tag"
            >
              {{ label }}
            </span>
          </template>
          <template v-else>{{ selectedLabels[0] }}</template>
        </template>
        <span v-else class="my-select__placeholder">{{ placeholder }}</span>
      </div>
      <div class="my-select__icons">
        <span
          v-if="clearable && isFilled && !finalDisabled"
          class="my-select__clear"
          @click.stop="handleClear"
        >
          &times;
        </span>
        <span class="my-select__arrow" :class="{ 'is-open': dropdownVisible }"
          >?</span
        >
      </div>
    </div>
    <teleport to="body">
      <transition name="select-fade">
        <div
          v-if="dropdownVisible"
          ref="dropdownRef"
          class="my-select__dropdown"
          :style="dropdownStyle"
        >
          <div v-if="filterable" class="my-select__search">
            <input
              ref="searchRef"
              v-model="searchValue"
              class="my-select__search-input"
              placeholder="搜索"
              @keydown.stop
            />
          </div>
          <div class="my-select__options">
            <div
              v-for="(option, index) in filteredOptions"
              :key="option.value"
              :class="[
                'my-select__option',
                {
                  'is-selected': isSelected(option.value),
                  'is-disabled': option.disabled,
                  'is-active': index === hoverIndex,
                },
              ]"
              @mouseenter="hoverIndex = index"
              @click="handleSelect(option)"
            >
              {{ option.label ?? option.value }}
            </div>
            <div v-if="!filteredOptions.length" class="my-select__empty">
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
import type { SelectProps, SelectEmits, SelectOption } from "./types";
import type { FormItemContext } from "../Form/types";
import { formItemContextKey } from "../Form/types";

defineOptions({
  name: "MySelect",
});

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: null,
  options: () => [],
  placeholder: "请选择",
  disabled: false,
  clearable: false,
  filterable: false,
  multiple: false,
  size: "default",
});

const emit = defineEmits<SelectEmits>();
const formItem = inject<FormItemContext | null>(formItemContextKey, null);

const wrapperRef = ref<HTMLElement>();
const dropdownVisible = ref(false);
const searchValue = ref("");
const hoverIndex = ref(-1);
const selectedValue = ref<SelectProps["modelValue"]>(
  props.modelValue ?? (props.multiple ? [] : null)
);
const dropdownStyle = ref<Record<string, string>>({});
const dropdownRef = ref<HTMLElement>();
const searchRef = ref<HTMLInputElement>();

const finalSize = computed(
  () => props.size ?? formItem?.size.value ?? "default"
);
const finalDisabled = computed(
  () => props.disabled || formItem?.disabled.value || false
);
const multiple = computed(() => props.multiple);

watch(
  () => props.modelValue,
  (value) => {
    selectedValue.value = value ?? (multiple.value ? [] : null);
  }
);

const selectedLabels = computed(() => {
  const optionsMap = new Map(
    props.options.map((option) => [option.value, option.label ?? option.value])
  );
  if (multiple.value) {
    const values = Array.isArray(selectedValue.value)
      ? selectedValue.value
      : [];
    return values.map((value) => optionsMap.get(value) ?? value);
  }
  if (selectedValue.value !== null && selectedValue.value !== undefined && !Array.isArray(selectedValue.value)) {
    return [optionsMap.get(selectedValue.value) ?? selectedValue.value];
  }
  return [];
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
  "my-select",
  `my-select--${finalSize.value}`,
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
  const keyword = searchValue.value.toLowerCase();
  return props.options.filter((option) =>
    String(option.label ?? option.value)
      .toLowerCase()
      .includes(keyword)
  );
});

const isSelected = (value: SelectOption["value"]) => {
  if (multiple.value) {
    return (
      Array.isArray(selectedValue.value) && selectedValue.value.includes(value)
    );
  }
  return selectedValue.value === value;
};

const openDropdown = () => {
  if (finalDisabled.value) return;
  dropdownVisible.value = true;
  emit("visibleChange", true);
  updateDropdownPosition();
  bindGlobalListeners();
  if (props.filterable) {
    requestAnimationFrame(() => searchRef.value?.focus());
  }
};

const closeDropdown = () => {
  dropdownVisible.value = false;
  emit("visibleChange", false);
  searchValue.value = "";
  hoverIndex.value = -1;
  unbindGlobalListeners();
};

const toggleDropdown = () => {
  dropdownVisible.value ? closeDropdown() : openDropdown();
};

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return;
  if (multiple.value) {
    const values = Array.isArray(selectedValue.value)
      ? [...selectedValue.value]
      : [];
    const index = values.indexOf(option.value);
    if (index > -1) {
      values.splice(index, 1);
    } else {
      values.push(option.value);
    }
    selectedValue.value = values;
    emit("update:modelValue", values);
    emit("change", values);
  } else {
    selectedValue.value = option.value;
    emit("update:modelValue", option.value);
    emit("change", option.value);
    closeDropdown();
  }
  formItem?.onFieldChange();
};

const handleClear = () => {
  if (!isInteractive()) return;
  const emptyValue = multiple.value ? [] : null;
  selectedValue.value = emptyValue;
  emit("update:modelValue", emptyValue);
  emit("change", emptyValue);
  emit("clear");
  formItem?.onFieldChange();
};

const isInteractive = () => !finalDisabled.value;

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

const moveHover = (direction: 1 | -1) => {
  if (!dropdownVisible.value || !filteredOptions.value.length) return;
  let index = hoverIndex.value;
  for (let i = 0; i < filteredOptions.value.length; i += 1) {
    index =
      (index + direction + filteredOptions.value.length) %
      filteredOptions.value.length;
    const option = filteredOptions.value[index];
    if (!option.disabled) {
      hoverIndex.value = index;
      break;
    }
  }
};

const selectHoverOption = () => {
  if (hoverIndex.value < 0 || hoverIndex.value >= filteredOptions.value.length)
    return;
  handleSelect(filteredOptions.value[hoverIndex.value]);
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
    case "ArrowDown":
      event.preventDefault();
      moveHover(1);
      break;
    case "ArrowUp":
      event.preventDefault();
      moveHover(-1);
      break;
    case "Enter":
      event.preventDefault();
      selectHoverOption();
      break;
    case "Escape":
      event.preventDefault();
      closeDropdown();
      break;
    default:
      break;
  }
};

watch(dropdownVisible, (visible) => {
  if (visible) {
    const selectedIndex = filteredOptions.value.findIndex((option) =>
      isSelected(option.value)
    );
    if (selectedIndex >= 0) {
      hoverIndex.value = selectedIndex;
    } else {
      hoverIndex.value = filteredOptions.value.findIndex(
        (option) => !option.disabled
      );
    }
  }
});

watch(filteredOptions, (options) => {
  if (!options.length) {
    hoverIndex.value = -1;
  } else if (hoverIndex.value >= options.length) {
    hoverIndex.value = options.length - 1;
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  unbindGlobalListeners();
});
</script>

<style scoped>
.my-select {
  position: relative;
  width: 100%;
}

.my-select__control {
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

.my-select__control:hover {
  border-color: var(--form-control-hover-border, var(--border-color-light));
}

.my-select.is-open .my-select__control {
  border-color: var(--form-control-focus-border, var(--primary-color));
  box-shadow: var(--form-control-focus-shadow, none);
}

.my-select.is-disabled .my-select__control {
  cursor: not-allowed;
  background-color: var(--bg-color-light);
  color: var(--text-placeholder);
}

.my-select__value {
  flex: 1;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  color: var(--text-regular);
}

.my-select__placeholder {
  color: var(--text-placeholder);
}

.my-select__icons {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-placeholder);
}

.my-select__arrow {
  transition: transform 0.2s;
}

.my-select__arrow.is-open {
  transform: rotate(180deg);
}

.my-select__clear {
  cursor: pointer;
}

.my-select__dropdown {
  position: absolute;
  z-index: 1000;
  background: var(--bg-color);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-base);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  max-height: 260px;
  overflow: hidden;
}

.my-select__search {
  padding: 8px;
  border-bottom: 1px solid var(--border-color-light);
}

.my-select__search-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--border-color-base);
  border-radius: 4px;
  outline: none;
}

.my-select__options {
  max-height: 210px;
  overflow-y: auto;
}

.my-select__option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.my-select__option:hover,
.my-select__option.is-active {
  background-color: var(--bg-color-light);
}

.my-select__option.is-disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
}

.my-select__option.is-selected {
  color: var(--primary-color);
}

.my-select__empty {
  text-align: center;
  padding: 12px;
  color: var(--text-placeholder);
}

.my-select__tag {
  background-color: var(--primary-color-light, rgba(64, 158, 255, 0.15));
  color: var(--primary-color);
  border-radius: 4px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 1.6;
}

.my-select--large .my-select__control {
  padding: 10px 14px;
}

.my-select--small .my-select__control {
  padding: 6px 10px;
}

.select-fade-enter-active,
.select-fade-leave-active {
  transition: opacity 0.15s ease;
}

.select-fade-enter-from,
.select-fade-leave-to {
  opacity: 0;
}
</style>
