import { shallowMount } from "@vue/test-utils";
import Snippet from "@/components/Snippet.vue";

describe("Snippet.vue", () => {
  const snippets = [
    {
      id: "1",
      title: "exampleSnippet",
      content: "some snippet content",
      language: "jest",
      tags: ["some", "tags"]
    }
  ];
  it("renders the props provided to the component", () => {
    const wrapper = shallowMount(Snippet, {
      propsData: snippets[0]
    });

    expect(wrapper.find(".title").text()).toEqual(snippets[0].title);
    expect(wrapper.find("textarea").element.value).toEqual(snippets[0].content);
    expect(wrapper.find(".language").text()).toEqual(snippets[0].language);
    expect(wrapper.find(".tags")).toMatchSnapshot();
  });
});
