'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useAnimations, useFBX, useGLTF } from '@react-three/drei'

type JSXIntrinsicElements = JSX.IntrinsicElements['group']

interface AvatarProps extends JSXIntrinsicElements {
    avatar: string
}

const Model = ({ avatar, ...props }: AvatarProps) => {
    const { scene } = useGLTF(avatar)
    const { animations } = useFBX('animations/idle.fbx')
    const group = useRef()

    animations[0].name = 'idle'

    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions.idle?.reset().fadeIn(0.5).play()

        return () => {
            actions.idle?.fadeOut(0.5)
        }
    }, [ actions, avatar ])

    useFrame(state => {
        (group.current as any)?.getObjectByName('Head').lookAt(state.camera.position)
    })

    // TODO: Viseme animation

    return (
        <group { ...props } dispose={ null } ref={ group as any }>
            <primitive object={ scene } dispose={ null } />
        </group>
    )
}


const Avatar = (props: AvatarProps) => {
    return (
        <div style={ { position: 'relative', height: '90vh' } }>
            <div style={ { position: 'absolute', inset: 0, bottom: 0, zIndex: 10 } }>
                <Canvas
                    key={ props.avatar }
                    shadows
                    camera={ { position: [ -1.7, 0, 8 ], fov: 30 } }
                    style={ { height: '100%' } }
                >
                    <Model { ...props } />
                    <Environment preset='sunset' />
                </Canvas>
            </div>
        </div>
    )
}


export { Avatar }
