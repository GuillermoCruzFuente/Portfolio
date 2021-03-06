import { CSSProperties, MutableRefObject, useLayoutEffect, useRef } from 'react'
import './AnimatedTitle.scss'

type textArray = {
    items: Array<string>,
    alignment: 'left' | 'right',
    textClass: string
}

type textItem = {
    item: string,
    ref: MutableRefObject<HTMLSpanElement | null>
}

const AnimatedTitle = ({ items, alignment, textClass }: textArray) => {
    const titleRef = useRef<HTMLHeadingElement>(null)

    const itemsWithRef: Array<textItem> = items.map((item: string) => {
        const itemWithRef: textItem = {
            item: item,
            ref: useRef<HTMLSpanElement>(null)
        }
        return itemWithRef
    })

    useLayoutEffect(() => {
        
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }

        const b = () => {
            itemsWithRef.forEach((item: textItem) => {
                if (item.ref.current) {
                    item.ref.current.style.opacity = '1'
                    item.ref.current.style.transform = 'translateY(0px)'
                }
            })
        }

        const a = (entries: Array<IntersectionObserverEntry>) => {
            entries.forEach(entry => {
                entry.isIntersecting ? b() : undefined
            })
        }

        const observer = new IntersectionObserver(a, observerOptions)

        observer.observe(titleRef.current as HTMLHeadingElement)
    }, [])

    const containerStyles: CSSProperties = {
        display: 'flex',
        flexFlow: 'row wrap',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: alignment === 'left' ? 'flex-start' : 'flex-end',
    }

    return (
        <h1 ref={titleRef} style={containerStyles} className='animated-title'>
            {
                itemsWithRef.map((item, index) => {
                    return (
                        <span className={`animated-segment ${textClass}`} ref={item.ref} style={{ transitionDelay: `${index * 200}ms` }} key={item.item}>{item.item}</span>
                    )
                })
            }
        </h1>
    )
}

export default AnimatedTitle