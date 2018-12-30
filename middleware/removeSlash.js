export default function({ route, redirect }) {
  let path = route.path;
  let lastPathElementIndex = path.length - 1;
  if (path[lastPathElementIndex] === '/') {
    return redirect(301, path.slice(0, lastPathElementIndex));
  }
}
