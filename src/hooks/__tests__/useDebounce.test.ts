import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should clear timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('test', 500));
    
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should handle multiple rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    rerender({ value: 'second' });
    rerender({ value: 'third' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('third');
  });
});