import React, { useEffect, useRef } from "react";
import { main } from "./threejs";

function Canvas() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return ;
        main(containerRef);
    }, [containerRef]);

    return (
        <div ref={containerRef}>

        </div>
    )
}

export default Canvas;