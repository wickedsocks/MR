export default function({ route, redirect }) {
  let path = route.path;
  let lastPathElementIndex = path.length - 1;
  if (path.length > 1 && path[lastPathElementIndex] === '/') {
    return redirect(301, path.slice(0, lastPathElementIndex));
  }
}
