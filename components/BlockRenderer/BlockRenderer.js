import { theme } from "theme"
import { Cover } from "../Cover/Cover"
import { Heading } from "../Heading/Heading"
import { Paragraph } from "../Paragraph/Paragraph"
import { CallToActionButton } from "components/CallToActionButton/CallToActionButton"
import { Columns } from "components/Columns"
import { Column } from "components/Column"
import Image from "next/image"

export const BlockRenderer = ({ blocks }) => {
    return blocks.map((block) => {
        switch (block.name) {
            case 'core/cover': {
                return (
                    <Cover
                        key={block.id}
                        background={block.attributes.url}
                    >
                        <BlockRenderer
                            blocks={block.innerBlocks}
                        />
                    </Cover>
                )
            }
            case 'core/post-title':
            case 'core/heading': {
                return (
                    <Heading
                        key={block.id}
                        textAlign={block.attributes.textAlign}
                        content={block.attributes.content}
                        level={block.attributes.level}
                    />
                )
            }
            case 'core/paragraph': {
                return (
                    <Paragraph
                        key={block.id}
                        textAlign={block.attributes.align}
                        textColor={theme[block.attributes.textColor] ||
                            block.attributes.style?.color?.text}
                        content={block.attributes.content}
                    />
                )
            }
            case 'core/columns': {
                return (
                    <Columns
                        key={block.id}
                        isStackedOnMobile={block.attributes.isStackedOnMobile}
                    >
                        <BlockRenderer
                            blocks={block.innerBlocks}
                        />
                    </Columns>
                )
            }
            case 'core/column': {
                return (
                    <Column
                        key={block.id}
                        width={block.attributes.width}
                    >
                        <BlockRenderer
                            blocks={block.innerBlocks}
                        />
                    </Column>
                )
            }
            case 'core/image': {
                return (
                    <Image
                        key={block.id}
                        src={block.attributes.url}
                        height={block.attributes.height}
                        width={block.attributes.width}
                        alt={block.attributes.alt || ""}
                    />
                )
            }
            case 'core/block':
            case 'core/group': {
                return (
                    <BlockRenderer
                        key={block.id}
                        blocks={block.innerBlocks}
                    />
                )
            }
            case 'acf/ctabutton': {
                return (
                    <CallToActionButton
                        key={block.id}
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || "/"}
                        align={block.attributes.data.align}
                    />
                )
            }
            default: {
                console.log("unkown", block)
                return null
            }
        }
    })
}