export const levels = [
  {
    map: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    player: [1, 1] as const,
    boxes: [[2, 2] as const],
    targets: [[4, 4] as const],
  },
  {
    map: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    player: [1, 1] as const,
    boxes: [[3, 2] as const, [2, 2] as const],
    targets: [[4, 4], [3, 4] as const],
  },
]
