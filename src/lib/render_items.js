const renderVersesItems = (items) =>
    [...items.entries()]
        .filter(
            (i) =>
                i[1].type !== 'graft' &&
                i[1].subType !== 'end' &&
                (i[1].subType !== 'start' || i[1].payload.startsWith('verses'))
        )
        .map((i) =>
            i[1].type === 'scope' ? (
                [
                    <b
                        key={i[0]}
                    >
                        {i[1].payload.split('/')[1]}
                    </b>,
                    ' ',
                ]
            ) : (
                <span key={i[0]}>{i[1].payload}</span>
            )
        );

export { renderVersesItems };
