export const MindmapLayout = { 
    name: 'dagre',
    animate: true,
    animationEasing: 'ease-in-out',
    rankDir: 'TB',
    minLen: (edge) => { return 2; },
};