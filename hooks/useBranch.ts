'use client'

import { useState, useCallback, useMemo } from 'react'
import { BRANCHES } from '@/data/branches'
import { Branch } from '@/types/branches'
import { BranchKey } from '@/types/products'


interface UseBranchReturn {
  activeBranch: Branch
  activeBranchKey: BranchKey
  branches: Branch[]
  setBranch: (key: BranchKey) => void
  isActive: (key: BranchKey) => boolean
}

export function useBranch(defaultBranch: BranchKey = 'gresik'): UseBranchReturn {
  const [activeBranchKey, setActiveBranchKey] = useState<BranchKey>(defaultBranch)

  const activeBranch = useMemo(
    () => BRANCHES.find((b) => b.key === activeBranchKey) ?? BRANCHES[0],
    [activeBranchKey]
  )

  const setBranch = useCallback((key: BranchKey) => {
    setActiveBranchKey(key)
  }, [])

  const isActive = useCallback(
    (key: BranchKey) => key === activeBranchKey,
    [activeBranchKey]
  )

  return {
    activeBranch,
    activeBranchKey,
    branches: BRANCHES,
    setBranch,
    isActive,
  }
}