import React from "react";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { mount } from "enzyme";
import { css } from "styled-components";
import Tile from ".";
import { StyledTile, TileContent } from "./tile.style";
import Content from "../content";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";

function render(props, renderer = TestRenderer.create) {
  return renderer(
    <Tile {...props}>
      <Content key="one">Child 1</Content>
      <Content>Child 2</Content>
    </Tile>
  );
}

describe("Tile", () => {
  it("renders base styles", () => {
    const wrapper = render({});

    expect(wrapper).toMatchSnapshot();
  });

  describe("wrapping of children in TileContent components", () => {
    describe("standard", () => {
      const wrapper = render({}, mount);
      const tileContents = wrapper.find(TileContent).getElements();

      it("contains one TileContent for each child", () => {
        expect(tileContents.length).toBe(2);
      });

      it.each([0, 1])(
        "TileContent[%i] contains the passed Content as its own child",
        (childIndex) => {
          expect(tileContents[childIndex].props.children.type.name).toBe(
            "Content"
          );
          expect(tileContents[childIndex].props.children.props.children).toBe(
            `Child ${childIndex + 1}`
          );
        }
      );
    });

    describe("when something causes a child element to return nothing", () => {
      const children = [<Content key="one">Child 1</Content>, undefined];

      const wrapper = mount(<Tile>{children}</Tile>);

      const tileContents = wrapper.find(TileContent).getElements();

      it("only contains one TileContent", () => {
        expect(tileContents.length).toBe(1);
      });
    });
  });

  describe("styles", () => {
    describe("as", () => {
      it('renders a white background when as === "tile"', () => {
        const wrapper = render({ as: "tile" }).toJSON();

        assertStyleMatch({ backgroundColor: "#FFFFFF" }, wrapper);
      });

      it('renders a transparent background when as === "transparent"', () => {
        const wrapper = render({ as: "transparent" }).toJSON();

        assertStyleMatch({ backgroundColor: "transparent" }, wrapper);
      });
    });

    describe("orientation", () => {
      describe("when it is horizontal", () => {
        const wrapper = render({ orientation: "horizontal" }).toJSON();

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "row" }, wrapper);
        });
      });

      describe("when it is vertical", () => {
        const wrapper = render({ orientation: "vertical" }).toJSON();

        it("sets the correct flex-direction on the main wrapper", () => {
          assertStyleMatch({ flexDirection: "column" }, wrapper);
        });
      });

      describe("width", () => {
        it("sets width to 100% when width prop is undefined", () => {
          const wrapper = render().toJSON();

          assertStyleMatch({ width: "100%" }, wrapper);
        });

        it("sets width to 100% when width prop is 0", () => {
          const wrapper = render({ width: 0 }).toJSON();

          assertStyleMatch({ width: "100%" }, wrapper);
        });

        it("sets width to the passed percentage value when width prop is non-zero", () => {
          const wrapper = render({ width: 25 }).toJSON();

          assertStyleMatch({ width: "25%" }, wrapper);
        });

        it.each([1, 150, 500])(
          "is overridden when the pixelWidth prop is set to %s",
          (pixelWidth) => {
            const wrapper = render({ pixelWidth, width: 25 }).toJSON();

            assertStyleMatch({ width: `${pixelWidth}px` }, wrapper);
          }
        );
      });
    });
  });

  describe("TileContent", () => {
    describe("styles", () => {
      function renderTileContent(props) {
        return TestRenderer.create(
          <TileContent {...props}>Test</TileContent>
        ).toJSON();
      }

      // eslint-disable-next-line max-len
      testStyledSystemSpacing(
        (props) => <Tile {...props} headerSpace={{ p: 3 }} />,
        { p: 3 },
        (wrapper) => wrapper.find(StyledTile)
      );

      it("has the correct base styles", () => {
        const wrapper = renderTileContent();

        assertStyleMatch(
          {
            position: "relative",
            flexGrow: "1",
            width: undefined,
          },
          wrapper
        );
      });

      describe('orientation="horizontal"', () => {
        const wrapper = mount(<TileContent isHorizontal>test</TileContent>);

        it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
          assertStyleMatch(
            {
              marginTop: "0",
              borderLeft: `solid 1px ${baseTheme.tile.separator}`,
            },
            wrapper,
            {
              modifier: css`
                ${`& + ${TileContent}`}
              `,
            }
          );
        });

        it("should not set padding right to last component", () => {
          assertStyleMatch(
            {
              paddingRight: "0",
            },
            wrapper,
            { modifier: ":last-of-type" }
          );
        });

        it("should not set padding left to first component", () => {
          assertStyleMatch(
            {
              paddingLeft: "0",
            },
            wrapper,
            { modifier: ":first-of-type" }
          );
        });
      });

      describe('orientation="vertical"', () => {
        const wrapper = mount(<TileContent isVertical>test</TileContent>);

        it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
          assertStyleMatch(
            {
              marginTop: "0",
              borderTop: `solid 1px ${baseTheme.tile.separator}`,
            },
            wrapper,
            {
              modifier: css`
                ${`& + ${TileContent}`}
              `,
            }
          );
        });

        it("should not set padding bottom to last component", () => {
          assertStyleMatch(
            {
              paddingBottom: "0",
            },
            wrapper,
            { modifier: ":last-of-type" }
          );
        });

        it("should not set padding top to first component", () => {
          assertStyleMatch(
            {
              paddingTop: "0",
            },
            wrapper,
            { modifier: ":first-of-type" }
          );
        });
      });

      it("sets border-top and padding-top, and width: auto for all but the first TileComponent", () => {
        const wrapper = mount(<TileContent isVertical>test</TileContent>);

        assertStyleMatch(
          {
            marginTop: "0",
            borderTop: `solid 1px ${baseTheme.tile.separator}`,
          },
          wrapper,
          {
            modifier: css`
              ${`& + ${TileContent}`}
            `,
          }
        );
      });

      describe("width", () => {
        it("sets width to the passed percentage value and flex-grow to 0 when width prop is non-zero", () => {
          const wrapper = renderTileContent({ width: 25 });

          assertStyleMatch({ flexGrow: "0", width: "25%" }, wrapper);
        });
      });
    });
  });
});
