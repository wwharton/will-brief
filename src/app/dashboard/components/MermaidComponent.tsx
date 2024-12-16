import mermaid from "mermaid";
import { useEffect } from "react";

mermaid.initialize({});

const MermaidComponent = ({ source, id }: { source: string; id: string }) => {
  useEffect(() => {
    document.getElementById(id)?.removeAttribute("data-processed");
    mermaid.contentLoaded();
  }, [source, id]);

  return (
    <div className="mermaid" id={id}>
      {source}
    </div>
  );
};

export default MermaidComponent;