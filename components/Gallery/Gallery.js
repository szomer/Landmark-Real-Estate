import Image from "next/image";

export const Gallery = ({ columns, cropImages, items }) => {
    const columnWidth = 100 / columns;
    let maxHeight = 0, maxWidth = 0;

    if (cropImages) {
        items.forEach(item => {
            maxHeight = Math.max(item.attributes.height, maxHeight)
            maxWidth = Math.max(item.attributes.width, maxWidth)
        })
    }

    return (
        <div className="flex flex-wrap max-w-5xl mx-auto">
            {items.map((item) => {
                return <div
                    key={item.id}
                    style={{ width: `${columnWidth}%` }}
                    className="p-5 flex-grow"
                >
                    <Image
                        style={{ objectFit: "cover" }}
                        src={item.attributes.url}
                        height={maxHeight || item.attributes.height}
                        width={maxWidth || item.attributes.width}
                        alt={item.attributes.alt}
                    />
                </div>
            })}
        </div>
    )
}