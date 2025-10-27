import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { getLogoDataUri } from "../getLogo";

const descWords = SITE.desc.split(' ');
const descElements = !SITE.desc.startsWith('Proudly ') ? 
  SITE.desc :
  [
    {
      type: 'span',
      props: {
        children: descWords[0],
        style: {
          marginRight: '0.25em',
          paddingBottom: '0.05em',
          borderBottom: '2px dashed #dc2626', // red 600
        },
      },
    },
     descWords.slice(1).join(' '),
  ];

export default async () => {
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
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90%",
                          maxHeight: "90%",
                          overflow: "hidden",
                          textAlign: "center",
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center' },
                              children: [
                                {
                                  type: 'img',
                                  props: {
                                    src: getLogoDataUri(),
                                    style: {
                                      marginRight: '1.5em',
                                      maxWidth: '5em',
                                      maxHeight: '5em',
                                    }
                                  }
                                },
                                {
                                  type: "p",
                                  props: {
                                    style: { fontSize: 72, fontWeight: "bold" },
                                    children: SITE.title,
                                  },
                                },
                              ]
                            }
                          },
                          {
                            type: "p",
                            props: {
                              style: { 
                                fontSize: 28,
                              },
                              children: descElements,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 28,
                        },
                        children: {
                          type: "span",
                          props: {
                            style: { overflow: "hidden", fontWeight: "bold" },
                            children: new URL(SITE.website).hostname,
                          },
                        },
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
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
    }
  );
};
