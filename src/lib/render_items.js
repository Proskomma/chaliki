const renderVersesItems = (items, renderChapters) =>
    [...items.entries()]
        .filter(
            (i) =>
                i[1].type !== 'graft' &&
                i[1].subType !== 'end' &&
                (i[1].subType !== 'start' || i[1].payload.startsWith('verses') || i[1].payload.startsWith('chapter'))
        )
        .map((i) =>
            i[1].type === 'scope' ? (
                i[1].payload.startsWith('verses') ?
                    [
                        <b
                            key={i[0]}
                        >
                            {i[1].payload.split('/')[1]}
                        </b>,
                        ' ',
                    ] :
                    renderChapters ?
                        [
                            <b
                                key={i[0]}
                                style={{backgroundColor: '#DDD', paddingLeft: '0.25em', paddingRight: '0.25em'}}
                            >
                                {i[1].payload.split('/')[1]}
                            </b>,
                            ' ',
                        ] :
                        []
            ) : (
                <span key={i[0]}>{i[1].payload}</span>
            )
        );

export {renderVersesItems};
