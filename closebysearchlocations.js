
      export function configCloseBySearchLocations(consecutiveSearchLocationsFn) {
        consecutiveSearchLocations = consecutiveSearchLocationsFn;
        useOnlyConsecutiveLocations = false;
      }

      export function setUseOnlyConsecutiveLocations() {
        useOnlyConsecutiveLocations = true;
      }


      /**
       * @param location {any}
       */
      export function* closeBySearchLocations(location) {
        let locationToUse = consecutiveSearchLocations(location);
        if (useOnlyConsecutiveLocations) {
          yield* locationToUse;
        }
        const closeByLocations = [];
        while (true) {
          const nextLocation = locationToUse.next().value;
          if (nextLocation == null) {
            if (useOnlyConsecutiveLocations) {
              return;
            }
            locationToUse = closeByLocations.shift();
          } else {
            yield nextLocation;
            closeByLocations.push(consecutiveSearchLocations(nextLocation));
          }
        }
      }

      let consecutiveSearchLocations;
      let useOnlyConsecutiveLocations = false;
