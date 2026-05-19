/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import isPlainObject from 'lodash/isPlainObject'
import type { NavigationTree } from '@/@types/navigation'

interface NavInfo extends NavigationTree {
    parentKey?: string
}

const getRouteInfo = (
    navTree: NavInfo | NavInfo[],
    key: string,
    path?: string,
): NavInfo | undefined => {
    if (!Array.isArray(navTree) && (navTree.key === key || (path && navTree.path === path))) {
        return navTree
    }
    let activedRoute: NavInfo | undefined
    let isIncludeActivedRoute = false
    for (const p in navTree) {
        if (
            p !== 'icon' &&
            navTree.hasOwnProperty(p) &&
            typeof (navTree as any)[p] === 'object'
        ) {
            if (
                isPlainObject((navTree as any)[p]) &&
                (navTree as any)[p].subMenu?.length > 0
            ) {
                if (
                    (navTree as any)[p].subMenu.some(
                        (el: NavInfo) => el.key === key || (path && el.path === path),
                    )
                ) {
                    isIncludeActivedRoute = true
                }
            }

            activedRoute = getRouteInfo((navTree as any)[p], key, path)

            if (activedRoute) {
                if (isIncludeActivedRoute) {
                    activedRoute.parentKey = (navTree as any)[p].key
                }

                return activedRoute
            }
        }
    }
    return activedRoute
}

const findNestedRoute = (navTree: NavigationTree[], key: string, path?: string): boolean => {
    const found = navTree.find((node) => {
        return node.key === key || (path && node.path === path)
    })
    if (found) {
        return true
    }
    return navTree.some((c) => findNestedRoute(c.subMenu, key, path))
}

const getTopRouteKey = (
    navTree: NavigationTree[],
    key: string,
    path?: string,
): NavigationTree => {
    let foundNav = {} as NavigationTree
    navTree.forEach((nav) => {
        if (findNestedRoute([nav], key, path)) {
            foundNav = nav
        }
    })
    return foundNav
}

function useMenuActive(navTree: NavigationTree[], key: string) {
    const pathname = usePathname()

    const activedRoute = useMemo(() => {
        const route = getRouteInfo(navTree, key, pathname)
        return route
    }, [navTree, key, pathname])

    const includedRouteTree = useMemo(() => {
        const included = getTopRouteKey(navTree, key, pathname)
        return included
    }, [navTree, key, pathname])

    return { activedRoute, includedRouteTree }
}

export default useMenuActive
