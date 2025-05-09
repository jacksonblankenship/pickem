/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PicksGroupIdYearWeekImport } from './routes/picks.$groupId.$year.$week'

// Create/Update Routes

const PicksGroupIdYearWeekRoute = PicksGroupIdYearWeekImport.update({
  id: '/picks/$groupId/$year/$week',
  path: '/picks/$groupId/$year/$week',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/picks/$groupId/$year/$week': {
      id: '/picks/$groupId/$year/$week'
      path: '/picks/$groupId/$year/$week'
      fullPath: '/picks/$groupId/$year/$week'
      preLoaderRoute: typeof PicksGroupIdYearWeekImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/picks/$groupId/$year/$week': typeof PicksGroupIdYearWeekRoute
}

export interface FileRoutesByTo {
  '/picks/$groupId/$year/$week': typeof PicksGroupIdYearWeekRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/picks/$groupId/$year/$week': typeof PicksGroupIdYearWeekRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/picks/$groupId/$year/$week'
  fileRoutesByTo: FileRoutesByTo
  to: '/picks/$groupId/$year/$week'
  id: '__root__' | '/picks/$groupId/$year/$week'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  PicksGroupIdYearWeekRoute: typeof PicksGroupIdYearWeekRoute
}

const rootRouteChildren: RootRouteChildren = {
  PicksGroupIdYearWeekRoute: PicksGroupIdYearWeekRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/picks/$groupId/$year/$week"
      ]
    },
    "/picks/$groupId/$year/$week": {
      "filePath": "picks.$groupId.$year.$week.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
