import { gql } from "@apollo/client"
import client from "client"
import { mapMainMenuItems } from "./mapMainMenuItems"
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks"

export const getPageStaticsProps = async (context) => {
  const uri = context.params?.slug ? (`${context.params.slug.join("/")}/`) : "/";

  const { data } = await client.query({
    query: gql`
          query PageQuery($uri: String!) {
            nodeByUri(uri: $uri) {
              ... on Page {
                id
                title
                blocks
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                seo {
                  title
                  metaDesc
                }
              }
              ... on Property {
                id
                title
                blocks
                seo {
                  title
                  metaDesc
                }
              }
            }
            acfOptionsMainMenu {
              mainMenu {
                callToActionButton {
                  label
                  destination{
                    ... on Page {
                      uri
                    }
                  }
                }
                menuItems {
                  menuItem {
                    destination{
                      ... on Page {
                        uri
                      }
                    }
                    label
                  }
                  items {
                    destination {
                      ... on Page {
                        uri
                      }
                    }
                    label
                  }
                }
              }
            }
          }
          `,
    variables: {
      uri,
    }
  })
  return {
    props: {
      seo: data.nodeByUri.seo,
      title: data.nodeByUri.title,
      propertyFeatures: data.nodeByUri.propertyFeatures || null,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
    },
  }


}