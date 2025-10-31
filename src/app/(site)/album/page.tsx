interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

interface Album {
  id: number
  photos: Photo[]
}

async function getPhotos(): Promise<Photo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos')
  console.log(res)
  if (!res.ok) {
    throw new Error('Failed to fetch photos')
  }

  return res.json()
}

function groupPhotosByAlbum(photos: Photo[]): Album[] {
  const albumMap = new Map<number, Photo[]>()

  photos.forEach((photo) => {
    if (!albumMap.has(photo.albumId)) {
      albumMap.set(photo.albumId, [])
    }
    albumMap.get(photo.albumId)!.push(photo)
  })

  return Array.from(albumMap.entries()).map(([id, photos]) => ({
    id,
    photos,
  }))
}

export default async function AlbumPage() {
  const photos = await getPhotos()
  const albums = groupPhotosByAlbum(photos)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Albums Photo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Découvrez notre collection de {albums.length} albums magnifiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <article
              key={album.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              {/* Image de couverture (première photo de l'album) */}
              <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={album.photos[0]?.url}
                  alt={album.photos[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge avec le nombre de photos */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {album.photos.length} photos
                  </span>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-1">
                  Album {album.id}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {album.photos[0]?.title}
                </p>

                {/* Aperçu des miniatures */}
                <div className="flex gap-2 mb-4 overflow-hidden">
                  {album.photos.slice(0, 4).map((photo) => (
                    <div
                      key={photo.id}
                      className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400 transition-colors"
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {album.photos.length > 4 && (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-slate-200 dark:border-slate-600">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        +{album.photos.length - 4}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bouton d'action */}
                <button className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                  Voir l&apos;album
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
