import ReactTestUtils from "react-dom/test-utils";
import Landing from "./pages/Landing";

test("mount component", async () => {
    expect(Landing).toBeTruthy();
    ReactTestUtils.isElement(Landing);
})