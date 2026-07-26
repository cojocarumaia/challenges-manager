import {
    afterAll,
    describe,
    expect,
    test,
    vi,
} from 'vitest';

import getChallengeState from './getChallengeState';

vi.useFakeTimers();
vi.setSystemTime(new Date('2026-07-15T12:00:00'));

describe('getChallengeState', () => {
    test('returns upcoming before the challenge starts', () => {
        const state = getChallengeState({
            startDate: '2026-08-01',
            endDate: '2026-08-31',
            targetSteps: 10000,
            currentSteps: 0,
        });

        expect(state).toBe('upcoming');
    });

    test('returns in-progress while the challenge is active and the target is not reached', () => {
        const state = getChallengeState({
            startDate: '2026-07-01',
            endDate: '2026-07-31',
            targetSteps: 10000,
            currentSteps: 5000,
        });

        expect(state).toBe('in-progress');
    });

    test('returns finished when the user exceeds the target', () => {
        const state = getChallengeState({
            startDate: '2026-07-01',
            endDate: '2026-07-31',
            targetSteps: 10000,
            currentSteps: 12000,
        });

        expect(state).toBe('finished');
    });

    test('returns failed after the challenge ends without reaching the target', () => {
        const state = getChallengeState({
            startDate: '2026-06-01',
            endDate: '2026-07-10',
            targetSteps: 10000,
            currentSteps: 7000,
        });

        expect(state).toBe('failed');
    });

    test('returns finished when the steps exactly match the target', () => {
        const state = getChallengeState({
            startDate: '2026-07-01',
            endDate: '2026-07-31',
            targetSteps: 10000,
            currentSteps: 10000,
        });

        expect(state).toBe('finished');
    });
});

afterAll(() => {
    vi.useRealTimers();
});