import { type Meta } from "@storybook/react"
import { ArrowRight, ArrowUpRight } from "../Icon"
import { TextLink, type TextLinkProps } from "./TextLink"

const meta = {
  title: "Components/TextLink",
  component: TextLink,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
  args: {
    href: "#",
  },
} satisfies Meta<typeof TextLink>

export default meta

export const Base = (args: TextLinkProps) => (
  <p>
    You can use the <TextLink {...args}>responses endpoint</TextLink> to generate text. You can
    either use the API directly from an HTTP client of your choice, or use one of OpenAI's{" "}
    <TextLink {...args}>official SDKs</TextLink> for your preferred language.
  </p>
)

export const Colors = (args: { colorClassName: string }) => (
  <p className={args.colorClassName}>
    You can use the <TextLink href="#">responses endpoint</TextLink> to generate text. You can
    either use the API directly from an HTTP client of your choice, or use one of OpenAI's{" "}
    <TextLink href="#">official SDKs</TextLink> for your preferred language.
  </p>
)

Colors.args = {
  colorClassName: "text-secondary",
}

Colors.argTypes = {
  colorClassName: {
    control: "select",
    options: [
      "text-default",
      "text-base",
      "text-secondary",
      "text-tertiary",
      "text-primary",
      "text-info",
      "text-discovery",
      "text-danger",
      "text-warning",
      "text-caution",
    ],
  },
}

Colors.parameters = {
  controls: { include: ["colorClassName"] },
}

export const Primary = (args: TextLinkProps) => (
  <p>
    Sample text with a <TextLink {...args}>primary link</TextLink>
  </p>
)

Primary.args = {
  primary: true,
}

Primary.parameters = {
  controls: { include: ["primary"] },
}

export const Underline = (args: TextLinkProps) => (
  <p className="text-secondary">
    Sample text with a <TextLink {...args}>subtle link</TextLink>
  </p>
)

Underline.args = {
  underline: false,
}

Underline.parameters = {
  controls: { include: ["underline"] },
}

export const External = (args: TextLinkProps) => (
  <TextLink {...args}>
    External link <ArrowUpRight />
  </TextLink>
)

External.args = {
  primary: true,
  underline: true,
  href: "https://openai.com",
}

export const Weight = (args: TextLinkProps) => (
  <TextLink {...args}>
    Contact support <ArrowRight />
  </TextLink>
)

Weight.args = {
  className: "font-semibold",
  underline: false,
}
