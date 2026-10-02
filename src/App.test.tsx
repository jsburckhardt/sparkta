import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App.tsx'

describe('App', () => {
  it('identifies the scaffold without claiming product functionality', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Sparkta' })).toBeInTheDocument()
    expect(
      screen.getByText(/product capabilities will be delivered/i),
    ).toBeInTheDocument()
  })
})
