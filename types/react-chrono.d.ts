declare module 'react-chrono' {
  import * as React from 'react';

  export type MediaType = 'IMAGE' | 'VIDEO';

  export interface TimelineItemViewModel {
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardDetailedText?: string | string[];
    timelineContent?: React.ReactNode;
    url?: string;
    media?: {
      type: MediaType;
      source: {
        url: string;
      };
    };
  }

  export interface ChronoTheme {
    primary?: string;
    secondary?: string;
    cardBgColor?: string;
    titleColor?: string;
    titleColorActive?: string;
    cardTitleColor?: string;
    cardSubtitleColor?: string;
    cardDetailsColor?: string;
  }

  export interface ChronoFontSizes {
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardText?: string;
    cardDetailedText?: string;
  }

  export interface ChronoClassNames {
    card?: string;
    cardMedia?: string;
    cardTitle?: string;
    cardText?: string;
    cardDetailedText?: string;
    title?: string;
  }

  export interface ChronoProps {
    items: TimelineItemViewModel[];
    mode?: 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
    theme?: ChronoTheme;
    fontSizes?: ChronoFontSizes;
    classNames?: ChronoClassNames;
    cardHeight?: number;
    itemWidth?: number;
    scrollable?: boolean;
    hideControls?: boolean;
    allowDynamicUpdate?: boolean;
    slideShow?: boolean;
    slideItemDuration?: number;
    disableClickOnCircle?: boolean;
    disableNavOnKey?: boolean;
    disableToolbar?: boolean;
    disableTimelinePoint?: boolean;
    showAllCardsHorizontal?: boolean;
    cardPositionHorizontal?: 'LEFT' | 'RIGHT';
    focusActiveItemOnLoad?: boolean;
    useReadMore?: boolean;
    readMore?: string;
  }

  export const Chrono: React.FC<ChronoProps>;
}
