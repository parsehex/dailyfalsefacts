import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getLogoDataUri } from "../getLogo";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async post => {
  const extractListItems = (htmlContent) => {
    const regex = /<li>(.*?)<\/li>/g;
    let match;
    const items = [];
    while ((match = regex.exec(htmlContent)) !== null) {
      items.push(match[1]);
    }
    return items.slice(0, 4); // Get up to 4 items
  };
  const items = extractListItems(post.rendered.html);
  
  const datetime = dayjs(post.data.pubDatetime).tz(SITE.timezone);
  const date = datetime.format("D MMM, YYYY");
  
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "p",
                      props: {
                        style: {
                          fontSize: 64,
                          fontWeight: "bold",
                          maxHeight: "84%",
                          overflow: "hidden",
                          display: 'flex',
                          alignItems: 'center',
                        },
                        children: [
                          {
                            type: 'img',
                            props: {
                              src: getLogoDataUri(),
                              style: {
                                marginRight: '0.25em',
                                maxWidth: '1em',
                                maxHeight: '1em',
                              }
                            }
                          },
                          post.data.title,
                          {
                            type: "span",
                            props: {
                              style: { 
                                overflow: "hidden", 
                                fontWeight: "bold",
                                fontSize: '1.5rem',
                                marginLeft: '1.5em',
                                color: 'gray',
                              },
                              children: date,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: 28,
                          maxHeight: "65%",
                          overflow: "hidden",
                          display: 'flex',
                          flexDirection: 'column',
                          justifyItems: 'start',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          lineHeight: '1',
                        },
                        children: items.map((i) => ({
                          type: 'p',
                          props: {
                            children: '- ' + i,
                            style: {marginTop:1}
                          },
                        })),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "8px",
                          marginBottom: "8px",
                          fontSize: 28,
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              children: [
                                "by ",
                                {
                                  type: "span",
                                  props: {
                                    style: { color: "transparent" },
                                    children: '"',
                                  },
                                },
                                {
                                  type: "span",
                                  props: {
                                    style: {
                                      overflow: "hidden",
                                      fontWeight: "bold",
                                    },
                                    children: post.data.author,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            type: "span",
                            props: {
                              style: { overflow: "hidden", fontWeight: "bold" },
                              children: SITE.title,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        // get only used characters:
        post.data.title + post.data.author + SITE.title + "by" + items.join('') + '-' + date
      ),
    }
  );
};
