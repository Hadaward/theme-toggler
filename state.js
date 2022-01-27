export function createState(object) {
    const handlers = [];

    object.____listen = function(handler, element, property) {
        handlers.push({handler, element, property});
    }

    object.____emit = function() {
        for (const handler of handlers) {
            handler.element[handler.property] = handler.handler.apply(state, [handler.element]);
        }
    }

    const state = new Proxy(object, {
        set: function(target, name, value) {
            if (Object.hasOwn(target, name)) {
                target[name] = value;

                target.____emit();

                return true;
            }
        },

        get: function(target, name) {
            return target[name];
        }
    });

    return state;
}

export function useState(state, element, property, template) {
    state.____listen(template, element, property);
    state.____emit();
}