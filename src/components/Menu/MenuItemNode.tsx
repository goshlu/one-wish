// @ts-nocheck
import { defineComponent, computed, type PropType } from 'vue'
import type { MenuItem } from './types'

const MenuItemNode = defineComponent({
    name: 'MenuItemNode',
    props: {
        item: {
            type: Object as PropType<MenuItem>,
            required: true,
        },
        activeKey: {
            type: String,
            required: true,
        },
        openKeys: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    emits: ['select', 'toggle'],
    setup(props, { emit }) {
        const isOpen = computed(() => props.openKeys.includes(props.item.key))
        const isActive = computed(() => props.activeKey === props.item.key)
        const hasChildren = computed(() => !!props.item.children?.length)

        const handleClick = (e: MouseEvent) => {
            e.stopPropagation()
            if (props.item.disabled) return
            if (hasChildren.value) {
                emit('toggle', props.item.key)
            } else {
                emit('select', props.item.key)
            }
        }

        return () => (
            <li
                class={{
                    'my-menu__item': true,
                    'is-disabled': props.item.disabled,
                    'is-active': isActive.value,
                    'has-children': hasChildren.value,
                }}
            >
                <div class="my-menu__label" onClick={handleClick}>
                    <span>{props.item.label}</span>
                    {hasChildren.value && (
                        <span class={{ 'my-menu__arrow': true, 'is-open': isOpen.value }}>
                            <svg
                                viewBox="0 0 1024 1024"
                                width="12"
                                height="12"
                                fill="currentColor"
                            >
                                <path d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" />
                            </svg>
                        </span>
                    )}
                </div>
                {hasChildren.value && isOpen.value && (
                    <ul class="my-menu__children">
                        {props.item.children?.map(child => (
                            <MenuItemNode
                                key={child.key}
                                item={child}
                                activeKey={props.activeKey}
                                openKeys={props.openKeys}
                                onSelect={(key: string) => emit('select', key)}
                                onToggle={(key: string) => emit('toggle', key)}
                            />
                        ))}
                    </ul>
                )}
            </li>
        )
    },
})

export default MenuItemNode
