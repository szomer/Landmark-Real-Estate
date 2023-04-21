import { getTextAlign } from "utils/fonts"
import { relativeToAbsoluteURLS } from "utils/relativeToAbsoluteURLS"

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
    return <p
        dangerouslySetInnerHTML={{ __html: relativeToAbsoluteURLS(content) }}
        style={{ color: textColor }}
        className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
    />
}