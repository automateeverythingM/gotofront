import { debounce } from "loadsh";
import { useMemo } from "react";

/**
 *
 * @param {function} funcStart function thats triggered at start typing
 * @param {function} funcStop function thats triggered at end typing
 * @param {number} time debounce time
 * @returns {function} function that call stop and typing functions
 */
const useTypingDebounce = (funcStart, funcStop, time) => {
    const debounceStartTyping = useMemo(() => {
        return debounce(funcStart, time, {
            leading: true,
            trailing: false,
        });
    }, []);
    const debouncedStopTyping = useMemo(() => debounce(funcStop, time), []);

    const debounceTyping = () => {
        debounceStartTyping();
        debouncedStopTyping();
    };

    return debounceTyping;
};

export default useTypingDebounce;
