import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';

/** Returns a function that scrolls to a home-page section, navigating home first when on another page. */
export const useSectionNavigation = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return useCallback((sectionId: string) => {
        if (pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            scrollToSection(sectionId);
        }
    }, [navigate, pathname]);
};
