import { Unstyled } from "@storybook/blocks"
import { useMemo, useState } from "react"
import { EmptyMessage } from "../../src/components/EmptyMessage"
import * as Icons from "../../src/components/Icon"
import { copyToClipboard } from "../../src/lib/copyToClipboard"
import s from "./CustomIconGallery.module.css"

export const CustomIconGallery = () => {
  const [search, setSearch] = useState<string>("")
  const iconListMemo = useMemo(
    () =>
      Object.entries(Icons).filter(([name]) =>
        name.toLowerCase().includes(search.toLocaleLowerCase().trim()),
      ),
    [search],
  )

  const handleCopyIcon = async (iconName: string, IconComponent: any) => {
    try {
      // Render the icon and get the SVG element
      const iconElement = IconComponent({ width: "24", height: "24" })
      
      // Convert React element to string
      const svgString = getSvgStringFromElement(iconElement)
      
      // Copy to clipboard
      await copyToClipboard(svgString)
    } catch (error) {
      console.error("Failed to copy icon:", error)
    }
  }

  const getSvgStringFromElement = (element: any): string => {
    try {
      const props = element.props || {}
      const children = props.children || []
      
      let svgAttrs = `width="${props.width || "24"}" height="${props.height || "24"}" viewBox="${props.viewBox || "0 0 24 24"}" fill="${props.fill || "currentColor"}"`
      let svgString = `<svg ${svgAttrs} xmlns="http://www.w3.org/2000/svg">`
      
      const processChildren = (child: any) => {
        if (!child) return ""
        if (child.type === "path") {
          const pathProps = child.props || {}
          return `<path d="${pathProps.d}" fill="${pathProps.fill || "currentColor"}"/>`
        }
        if (Array.isArray(child)) {
          return child.map(processChildren).join("")
        }
        return ""
      }
      
      if (Array.isArray(children)) {
        svgString += children.map(processChildren).join("")
      } else {
        svgString += processChildren(children)
      }
      
      svgString += "</svg>"
      return svgString
    } catch (error) {
      console.error("Error converting SVG element:", error)
      return ""
    }
  }

  return (
    <Unstyled>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Icons.Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      {iconListMemo.length === 0 ? (
        <EmptyMessage className={s.EmptyMessage} fill="none">
          <EmptyMessage.Icon size="sm">
            <Icons.Search />
          </EmptyMessage.Icon>
          <EmptyMessage.Description>
            No icons found matching <span className={s.SearchTerm}>"{search}"</span>
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <div className={s.IconGallery}>
          {iconListMemo.map(([name, Icon]) => (
            <div
              key={name}
              className={s.IconItemContainer}
              onClick={() => handleCopyIcon(name, Icon)}
              title={`Click to copy SVG code for ${name}`}
            >
              <div className={s.IconWrapper}>
                <div className={s.IconDisplay}>
                  <Icon className={s.IconLarge} />
                </div>
              </div>
              <div className={s.IconName}>{name}</div>
            </div>
          ))}
        </div>
      )}
    </Unstyled>
  )
}
