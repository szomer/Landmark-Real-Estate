import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
    try {
        const { data } = await client.query({
            query: gql`
            query AllPropertiesQuery {
                properties {
                    nodes {
                        databaseId
                        title
                        uri
                        featuredImage {
                            node {
                                uri
                                sourceUrl
                            }
                        }
                        propertyFeatures {
                        bedrooms
                        bathrooms
                        hasParking
                        petFriendly
                        price
                        }
                    }
                }
            }
            `
        });
        return res.status(200).json({
            properties: data.properties.nodes,
        });
    } catch (e) {
        console.log("Err", e);
    }
}

export default handler;