import React from 'react'

export default function ContactHeroSection() {
  return (
          <section className=" bg-neutral-100 dark:bg-neutral-900 px-4 pt-24 md:pt-36 pb-12  mb-24 md:mb-36">
            <div className="flex flex-col justify-center items-center gap-6 mb-8">
              <h1 className="text-2xl md:text-4xl font-bold capitalize">
                ከእኛ ጋር ይገናኙ
              </h1>
              <p className="text-muted-foreground text-center">
                ከእርስዎ ጋር ለመነጋገር ሁልጊዜ ዝግጁ ነን። መልዕክትዎን ይላኩልን፤ በደስታ እንቀበላለን።
              </p>
            </div>
          </section>
  )
}
