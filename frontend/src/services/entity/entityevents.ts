type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

export function subscribeEntity(
    entity: string,
    listener: Listener
) {

    let entityListeners = listeners.get(entity);

    if (!entityListeners) {

        entityListeners = new Set();

        listeners.set(
            entity,
            entityListeners
        );

    }

    entityListeners.add(listener);

    return () => {

        entityListeners?.delete(listener);

    };

}

export function refreshEntity(
    entity: string
) {

    listeners
        .get(entity)
        ?.forEach(listener => listener());

}