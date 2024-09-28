import app from "./app";

interface Tween {
  object: any;
  property: any;
  propertyBeginValue: any;
  target: any;
  easing: any;
  time: any;
  change: any;
  complete: any;
  start: any;
}

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
export const tweening = [] as Tween[];

export function tweenTo(
  object,
  property,
  target,
  time,
  easing,
  onchange,
  oncomplete,
) {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: () => oncomplete(),
    start: Date.now(),
  } as Tween;

  tweening.push(tween);

  return tween;
}

// Listen for animate update.
app.ticker.add(() => {
  const now = Date.now();
  const remove = [] as Tween[];

  for (let i = 0; i < tweening.length; i++) {
    const t = tweening[i];
    const phase = Math.min(1, (now - t.start) / t.time);

    t.object[t.property] = lerp(
      t.propertyBeginValue,
      t.target,
      t.easing(phase),
    );
    if (t.change) t.change(t);
    if (phase === 1) {
      t.object[t.property] = t.target;
      if (t.complete) t.complete(t);
      remove.push(t);
    }
  }
  for (let i = 0; i < remove.length; i++) {
    tweening.splice(tweening.indexOf(remove[i]), 1);
  }
});

// Basic lerp funtion.
export function lerp(a1, a2, t) {
  return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
export function backout(amount) {
  return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}
