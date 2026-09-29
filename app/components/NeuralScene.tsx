"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type NodeData = {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  phase: number;
};

type PulseState = {
  edgeIndex: number;
  direction: number;
  progress: number;
  active: boolean;
};

const NODE_COUNT = 20;

const nodePositions = [
  [-1.35, 0.85, 0.35],
  [-1.05, 0.15, 0.9],
  [-1.25, -0.65, -0.15],
  [-0.55, 1.15, -0.65],
  [-0.45, 0.35, 0.15],
  [-0.65, -0.75, 0.7],
  [-0.1, 0.75, -0.2],
  [-0.15, -0.2, 0.95],
  [-0.25, -1.05, -0.35],
  [0.45, 1.05, 0.55],
  [0.55, 0.25, -0.05],
  [0.35, -0.5, 0.75],
  [0.65, -1.05, -0.25],
  [1.25, 0.75, -0.2],
  [1.15, 0.1, 0.85],
  [1.3, -0.65, 0.1],
  [0.95, 1.15, 0.8],
  [0.95, -1.15, 0.65],
  [-0.95, 0.95, -0.95],
  [0.95, -0.85, -0.8],
];

function NeuralNetwork() {
  const nodes = useMemo<NodeData[]>(
    () =>
      nodePositions.map(([x, y, z], index) => {
        const position = new THREE.Vector3(x, y, z);

        return {
          position: position.clone(),
          basePosition: position.clone(),
          phase: index * 0.73,
        };
      }),
    []
  );

  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const lineRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const haloRefs = useRef<(THREE.Mesh | null)[]>([]);

  const [activeNodes, setActiveNodes] = useState<number[]>([
    0,
    4,
    7,
    10,
    14,
  ]);

  const activityRef = useRef<number[]>(
    new Array(NODE_COUNT).fill(0)
  );

  const edges = useMemo<[number, number][]>(() => {
    const result: [number, number][] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const distances = nodes
        .map((node, j) => ({
          index: j,
          distance: nodes[i].basePosition.distanceTo(
            node.basePosition
          ),
        }))
        .filter((item) => item.index !== i)
        .sort((a, b) => a.distance - b.distance);

      for (const nearest of distances.slice(0, 2)) {
        const exists = result.some(
          ([a, b]) =>
            (a === i && b === nearest.index) ||
            (a === nearest.index && b === i)
        );

        if (!exists) {
          result.push([i, nearest.index]);
        }
      }
    }

    return result;
  }, [nodes]);

  const neighbors = useMemo(() => {
    const map: number[][] = Array.from(
      { length: NODE_COUNT },
      () => []
    );

    edges.forEach(([a, b]) => {
      map[a].push(b);
      map[b].push(a);
    });

    return map;
  }, [edges]);

  const findEdge = (from: number, to: number) => {
    return edges.findIndex(
      ([a, b]) =>
        (a === from && b === to) ||
        (a === to && b === from)
    );
  };

  const pulseStates = useRef<PulseState[]>(
    Array.from({ length: 6 }, () => ({
      edgeIndex: 0,
      direction: 1,
      progress: Math.random(),
      active: false,
    }))
  );

  const mouseTarget = useRef(
    new THREE.Vector2(0, 0)
  );

  const mouseCurrent = useRef(
    new THREE.Vector2(0, 0)
  );

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent
    ) => {
      mouseTarget.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouseTarget.current.y =
        -(
          (event.clientY / window.innerHeight) * 2 -
          1
        );
    };

    const handlePointerLeave = () => {
      mouseTarget.current.set(0, 0);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  useEffect(() => {
    let currentNode = 4;

    const propagationTimer = setInterval(() => {
      const currentNeighbors = neighbors[currentNode];

      if (
        !currentNeighbors ||
        currentNeighbors.length === 0
      ) {
        currentNode =
          Math.floor(Math.random() * NODE_COUNT);

        return;
      }

      const nextNode =
        currentNeighbors[
          Math.floor(
            Math.random() * currentNeighbors.length
          )
        ];

      const propagatedNodes = [
        currentNode,
        nextNode,
      ];

      const secondaryNeighbors =
        neighbors[nextNode]?.filter(
          (node) => node !== currentNode
        );

      if (
        secondaryNeighbors &&
        secondaryNeighbors.length > 0 &&
        Math.random() > 0.35
      ) {
        const secondary =
          secondaryNeighbors[
            Math.floor(
              Math.random() *
                secondaryNeighbors.length
            )
          ];

        propagatedNodes.push(secondary);
      }

      setActiveNodes(propagatedNodes);

      propagatedNodes.forEach((index) => {
        activityRef.current[index] = 1;
      });

      const edgeIndex = findEdge(
        currentNode,
        nextNode
      );

      if (edgeIndex !== -1) {
        const availablePulse =
          pulseStates.current.find(
            (pulse) => !pulse.active
          ) ??
          pulseStates.current[
            Math.floor(
              Math.random() *
                pulseStates.current.length
            )
          ];

        availablePulse.edgeIndex = edgeIndex;

        availablePulse.direction =
          edges[edgeIndex][0] === currentNode
            ? 1
            : -1;

        availablePulse.progress = 0;
        availablePulse.active = true;
      }

      currentNode = nextNode;
    }, 850);

    return () => {
      clearInterval(propagationTimer);
    };
  }, [neighbors, edges]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    mouseCurrent.current.lerp(
      mouseTarget.current,
      0.035
    );

    const mouseX = mouseCurrent.current.x;
    const mouseY = mouseCurrent.current.y;

    nodes.forEach((node, index) => {
      const movementX =
        Math.sin(
          time * 0.65 + node.phase
        ) * 0.055;

      const movementY =
        Math.cos(
          time * 0.55 +
            node.phase * 1.4
        ) * 0.055;

      const movementZ =
        Math.sin(
          time * 0.45 +
            node.phase * 0.8
        ) * 0.045;

      const parallaxX = mouseX * 0.12;
      const parallaxY = mouseY * 0.08;

      const depthInfluence =
        mouseX * mouseY * 0.035;

      node.position.x =
        node.basePosition.x +
        movementX +
        parallaxX;

      node.position.y =
        node.basePosition.y +
        movementY +
        parallaxY;

      node.position.z =
        node.basePosition.z +
        movementZ +
        depthInfluence;

      const isActive =
        activeNodes.includes(index);

      if (isActive) {
        activityRef.current[index] =
          THREE.MathUtils.lerp(
            activityRef.current[index],
            1,
            0.12
          );
      } else {
        activityRef.current[index] =
          THREE.MathUtils.lerp(
            activityRef.current[index],
            0,
            0.025
          );
      }

      const activity =
        activityRef.current[index];

      const group = nodeRefs.current[index];

      if (group) {
        group.position.copy(node.position);

        const pulse =
          1 +
          Math.sin(
            time * 5 + node.phase
          ) *
            0.08 *
            activity;

        group.scale.setScalar(pulse);
      }

      const halo = haloRefs.current[index];

      if (halo) {
        const scale =
          1 +
          activity *
            (0.45 +
              Math.sin(
                time * 6 + node.phase
              ) *
                0.12);

        halo.scale.setScalar(scale);

        const material =
          halo.material as THREE.MeshBasicMaterial;

        material.opacity =
          0.08 + activity * 0.22;
      }
    });

    lineRefs.current.forEach(
      (material, edgeIndex) => {
        if (!material) return;

        const [a, b] = edges[edgeIndex];

        const endpointActivity =
          Math.max(
            activityRef.current[a],
            activityRef.current[b]
          );

        const pulseActivity =
          pulseStates.current.some(
            (pulse) =>
              pulse.active &&
              pulse.edgeIndex === edgeIndex
          )
            ? 0.45
            : 0;

        material.opacity =
          0.16 +
          endpointActivity * 0.55 +
          pulseActivity;
      }
    );

    pulseStates.current.forEach(
      (pulse) => {
        if (!pulse.active) return;

        pulse.progress += delta * 0.75;

        if (pulse.progress >= 1) {
          pulse.progress = 1;
          pulse.active = false;
        }
      }
    );
  });

  return (
    <>
      {edges.map(([a, b], index) => (
        <NeuralConnection
          key={`edge-${a}-${b}`}
          start={nodes[a].position}
          end={nodes[b].position}
          materialRef={(material) => {
            lineRefs.current[index] = material;
          }}
        />
      ))}

      {nodes.map((node, index) => (
        <group
          key={`node-${index}`}
          ref={(ref) => {
            nodeRefs.current[index] = ref;
          }}
          position={node.position}
        >
          <mesh>
            <sphereGeometry
              args={[0.055, 12, 12]}
            />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>

          <mesh
            ref={(ref) => {
              haloRefs.current[index] = ref;
            }}
          >
            <sphereGeometry
              args={[0.14, 12, 12]}
            />
            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <mesh>
            <sphereGeometry
              args={[0.095, 10, 10]}
            />
            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={0.14}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      {pulseStates.current.map(
        (_, index) => (
          <NetworkPulse
            key={`network-pulse-${index}`}
            pulseStates={pulseStates}
            pulseIndex={index}
            nodes={nodes}
            edges={edges}
          />
        )
      )}
    </>
  );
}

function NeuralConnection({
  start,
  end,
  materialRef,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  materialRef: (
    material: THREE.LineBasicMaterial | null
  ) => void;
}) {
  const geometry = useMemo(() => {
    const points = [
      start.clone(),
      end.clone(),
    ];

    return new THREE.BufferGeometry().setFromPoints(
      points
    );
  }, []);

  useFrame(() => {
    const positionAttribute =
      geometry.attributes.position;

    positionAttribute.setXYZ(
      0,
      start.x,
      start.y,
      start.z
    );

    positionAttribute.setXYZ(
      1,
      end.x,
      end.y,
      end.z
    );

    positionAttribute.needsUpdate = true;
  });

  /*
   * lineSegments is intentionally used instead of
   * <line>. This avoids the TypeScript collision
   * between the R3F primitive and the browser SVG
   * <line> element.
   */
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color="#38bdf8"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function NetworkPulse({
  pulseStates,
  pulseIndex,
  nodes,
  edges,
}: {
  pulseStates: React.MutableRefObject<PulseState[]>;
  pulseIndex: number;
  nodes: NodeData[];
  edges: [number, number][];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    const pulse =
      pulseStates.current[pulseIndex];

    if (!pulse || !pulse.active) {
      ref.current.visible = false;
      return;
    }

    const edge = edges[pulse.edgeIndex];

    if (!edge) {
      ref.current.visible = false;
      return;
    }

    const from =
      pulse.direction === 1
        ? nodes[edge[0]].position
        : nodes[edge[1]].position;

    const to =
      pulse.direction === 1
        ? nodes[edge[1]].position
        : nodes[edge[0]].position;

    ref.current.visible = true;

    ref.current.position.lerpVectors(
      from,
      to,
      pulse.progress
    );

    const fade =
      Math.sin(
        pulse.progress * Math.PI
      );

    const material =
      ref.current.material as THREE.MeshBasicMaterial;

    material.opacity =
      0.35 + fade * 0.65;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry
        args={[0.042, 10, 10]}
      />

      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(180 * 3);

    for (let i = 0; i < 180; i++) {
      const radius =
        2.8 + Math.random() * 2.5;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      positions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      positions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      positions[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y +=
      delta * 0.012;

    pointsRef.current.rotation.x +=
      delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#38bdf8"
        size={0.018}
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Core() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.x =
        time * 0.25;

      outerRef.current.rotation.y =
        time * 0.35;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x =
        -time * 0.4;

      innerRef.current.rotation.z =
        time * 0.2;
    }

    if (coreRef.current) {
      const scale =
        1 +
        Math.sin(time * 3) * 0.08;

      coreRef.current.scale.setScalar(
        scale
      );
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry
          args={[0.48, 24, 24]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRef}>
        <sphereGeometry
          args={[0.34, 20, 20]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry
          args={[0.18, 16, 16]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.38,
            0.008,
            8,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh
        rotation={[
          0,
          Math.PI / 3,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.28,
            0.006,
            8,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ringRefs =
    useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    ringRefs.current.forEach(
      (ring, index) => {
        if (!ring) return;

        ring.rotation.z =
          time *
          (index % 2 === 0
            ? 0.12
            : -0.08);

        ring.rotation.x =
          Math.sin(
            time * 0.15 + index
          ) * 0.2;
      }
    );
  });

  return (
    <>
      {[2.45, 2.15, 1.85].map(
        (radius, index) => (
          <mesh
            key={radius}
            ref={(ref) => {
              ringRefs.current[index] =
                ref;
            }}
            rotation={[
              Math.PI / 2 +
                index * 0.15,
              index * 0.3,
              index * 0.4,
            ]}
          >
            <torusGeometry
              args={[
                radius,
                0.006,
                8,
                96,
              ]}
            />

            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      )}
    </>
  );
}

function SceneHud({
  systemLoad,
  activeNodes,
}: {
  systemLoad: number;
  activeNodes: number;
}) {
  return (
    <>
      <Html
        position={[
          -2.55,
          1.9,
          0,
        ]}
        center
        distanceFactor={5}
      >
        <div className="pointer-events-none w-36 font-mono text-[10px] tracking-[0.18em] text-slate-500">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            PROCESSING
          </div>

          <div className="mt-1 text-slate-600">
            REAL-TIME
          </div>
        </div>
      </Html>

      <Html
        position={[
          2.35,
          1.75,
          0,
        ]}
        center
        distanceFactor={5}
      >
        <div className="pointer-events-none w-36 text-right font-mono text-[10px] tracking-[0.15em] text-slate-500">
          <div className="flex items-center justify-end gap-2 text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            SYSTEM LOAD
          </div>

          <div className="mt-1 text-slate-600">
            {systemLoad}%
          </div>
        </div>
      </Html>

      <Html
        position={[
          2.4,
          -1.75,
          0,
        ]}
        center
        distanceFactor={5}
      >
        <div className="pointer-events-none w-44 text-right font-mono text-[10px] tracking-[0.15em] text-slate-600">
          <div className="text-cyan-400">
            {activeNodes} ACTIVE
          </div>

          <div className="mt-1">
            20 NODES / 20 LINKS
          </div>
        </div>
      </Html>

      <Html
        position={[
          -2.4,
          -1.8,
          0,
        ]}
        center
        distanceFactor={5}
      >
        <div className="pointer-events-none w-44 font-mono text-[10px] tracking-[0.15em] text-slate-600">
          <div className="text-cyan-400">
            NEURAL CORE
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            REASONING ACTIVE
          </div>
        </div>
      </Html>
    </>
  );
}

export default function NeuralScene() {
  const [systemLoad, setSystemLoad] =
    useState(64);

  const [activeNodes, setActiveNodes] =
    useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(
        Math.floor(
          58 + Math.random() * 27
        )
      );

      setActiveNodes(
        Math.floor(
          12 + Math.random() * 7
        )
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 5.5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />

        <ParticleField />

        <OrbitRings />

        <Core />

        <NeuralNetwork />

        <SceneHud
          systemLoad={systemLoad}
          activeNodes={activeNodes}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.12}
        />
      </Canvas>
    </div>
  );
}