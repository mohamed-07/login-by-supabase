import type { MediaDetails, MediaType } from '../types/mediaDetails.type';

interface MediaInformationProps {
  data: MediaDetails;
  mediaType: MediaType;
}

export function MediaInformation({ data, mediaType }: MediaInformationProps) {
  const releaseDate = data.release_date ?? data.first_air_date;
  const companies = data.production_companies
    ?.map((company) => company.name)
    .filter(Boolean);
  const financials = [
    data.budget ? { label: 'Budget', value: data.budget } : undefined,
    data.revenue ? { label: 'Box office', value: data.revenue } : undefined,
  ].filter((entry): entry is { label: string; value: number } =>
    Boolean(entry)
  );

  return (
    <section
      id="information"
      className="scroll-mt-24 border-t border-white/10 py-10 sm:py-14"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,.7fr)] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">
            About this {mediaType === 'tv' ? 'series' : 'film'}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">The details</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/70">
            {data.overview || 'No overview is available for this title.'}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
          {data.genres.length > 0 && (
            <div className="col-span-2">
              <dt className="text-white/45">Genres</dt>
              <dd className="mt-1 text-white/85">
                {data.genres.map((genre) => genre.name).join(' · ')}
              </dd>
            </div>
          )}
          {releaseDate && (
            <div>
              <dt className="text-white/45">
                {mediaType === 'tv' ? 'First aired' : 'Release date'}
              </dt>
              <dd className="mt-1 text-white/85">
                {new Date(`${releaseDate}T00:00:00`).toLocaleDateString(
                  undefined,
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </dd>
            </div>
          )}
          {data.original_language && (
            <div>
              <dt className="text-white/45">Original language</dt>
              <dd className="mt-1 uppercase text-white/85">
                {data.original_language}
              </dd>
            </div>
          )}
          {mediaType === 'movie' && data.runtime ? (
            <div>
              <dt className="text-white/45">Runtime</dt>
              <dd className="mt-1 text-white/85">{data.runtime} minutes</dd>
            </div>
          ) : null}
          {mediaType === 'tv' && data.episode_run_time?.[0] ? (
            <div>
              <dt className="text-white/45">Episode length</dt>
              <dd className="mt-1 text-white/85">
                About {data.episode_run_time[0]} minutes
              </dd>
            </div>
          ) : null}
          {data.status && (
            <div>
              <dt className="text-white/45">Status</dt>
              <dd className="mt-1 text-white/85">{data.status}</dd>
            </div>
          )}
          {companies && companies.length > 0 && (
            <div className="col-span-2">
              <dt className="text-white/45">Production</dt>
              <dd className="mt-1 text-white/85">{companies.join(' · ')}</dd>
            </div>
          )}
          {financials.map((financial) => (
            <div key={financial.label}>
              <dt className="text-white/45">{financial.label}</dt>
              <dd className="mt-1 text-white/85">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(financial.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
